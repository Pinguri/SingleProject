package com.ping.singleproject.common.encrypt;

import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.cryptography.EgovPasswordEncoder;
import org.egovframe.rte.fdl.cryptography.impl.EgovARIACryptoServiceImpl;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Slf4j
public class EncryptServiceImpl extends EgovAbstractServiceImpl implements EncryptService {
    private static final String DEFAULT_ENCODE;
    private static final int SALT_CNT;
    private static final String AES256_PW;
    private final static String ALGORISM; // ARIA 암호화 시 사용할 key의 알고리즘이다.
    private final static String PASSWORD; // ARIA 암호화 시 사용할 key 이름이다.
    private final static int BLOCK_SIZE;  // ARIA 암호화 시 사용할 블락 사이즈이다.
    private final static Charset CHAR_SET;    // byte로 변활할때의 인코딩이다.

    static {
        DEFAULT_ENCODE = "UTF-8";
        SALT_CNT = 12;
        AES256_PW = "library user delivery tab";
        ALGORISM = "SHA-256";
        PASSWORD = "KDOT_ROBOT_CMS";
        BLOCK_SIZE = 1025;
        CHAR_SET = StandardCharsets.UTF_8;
    }

    private final CommonValidation CommonValidation;

    @Override
    public String sha256Encrypt(String input) {
        String sha256 = null;

        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(input.getBytes(DEFAULT_ENCODE));

            byte[] bData = sh.digest();

            StringBuilder sb = new StringBuilder();

            for(byte data : bData) {
                int enc = data & 0xff;
                enc += 0x100;

                sb.append(Integer.toString(enc, 16).substring(1));
            }

            sha256 = sb.toString();
        } catch(Exception e) {
            log.error("SHA256 ENCRYPT ERROR : ", e);
        }

        return sha256;
    }

    @Override
    public String bCryptHashing(String input) {
        if(this.CommonValidation.isNull(input)) return null;

        String bCrypt = null;

        try {
            bCrypt = BCrypt.hashpw(input, BCrypt.genSalt(SALT_CNT));
        } catch(Exception e) {
            log.error("BCrypt ERROR : ", e);
        }

        return bCrypt;
    }

    @Override
    public boolean isBCryptPasswordMatch(String original, String hash) {
        boolean match = false;

        try {
            match = BCrypt.checkPw(original, hash);
        } catch(Exception e) {
            log.error("INCORRECT PASSWORD COMPARE ERROR");
        }

        return match;
    }

    @Override
    public String aes256Dec(final String input) {
        try {
            int keySize = 256;
            int ivSize = 128;
            byte[] ctBytes = Base64.getDecoder().decode(input.getBytes(StandardCharsets.UTF_8));
            byte[] saltBytes = Arrays.copyOfRange(ctBytes, 8, 16);
            byte[] ciphertextBytes = Arrays.copyOfRange(ctBytes, 16, ctBytes.length);

            byte[] key = new byte[keySize/8];
            byte[] iv = new byte[ivSize/8];
            EvpKDF(AES256_PW.getBytes(StandardCharsets.UTF_8), keySize, ivSize, saltBytes, key, iv);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"), new IvParameterSpec(iv));

            return new String(cipher.doFinal(ciphertextBytes));
        } catch (GeneralSecurityException e) {
            log.error("AES256 DEC ERROR : ", e);
            return "";
        }
    }

    private void EvpKDF(byte[] password, int keySize, int ivSize, byte[] salt, byte[] resultKey, byte[] resultIv) throws NoSuchAlgorithmException {
        EvpKDF(password, keySize, ivSize, salt, 1, "MD5", resultKey, resultIv);
    }

    private void EvpKDF(byte[] password, int keySize, int ivSize, byte[] salt, int iterations, String hashAlgorithm, byte[] resultKey, byte[] resultIv) throws NoSuchAlgorithmException {
        keySize = keySize / 32;
        ivSize = ivSize / 32;
        int targetKeySize = keySize + ivSize;
        byte[] derivedBytes = new byte[targetKeySize * 4];
        int numberOfDerivedWords = 0;
        byte[] block = null;
        MessageDigest hasher = MessageDigest.getInstance(hashAlgorithm);
        while (numberOfDerivedWords < targetKeySize) {
            if (block != null) {
                hasher.update(block);
            }
            hasher.update(password);
            block = hasher.digest(salt);
            hasher.reset();

            for (int i = 1; i < iterations; i++) {
                block = hasher.digest(block);
                hasher.reset();
            }

            System.arraycopy(block, 0, derivedBytes, numberOfDerivedWords * 4,
                    Math.min(block.length, (targetKeySize - numberOfDerivedWords) * 4));
            numberOfDerivedWords += block.length/4;
        }

        System.arraycopy(derivedBytes, 0, resultKey, 0, keySize * 4);
        System.arraycopy(derivedBytes, keySize * 4, resultIv, 0, ivSize * 4);
    }

    @Override
    public String ariaEncrypt(String input) {
        return this.ariaCrypto(input, "ENCODE");
    }

    @Override
    public String ariaDecrypted(String input) {
        return this.ariaCrypto(input, "DECODE");
    }

    private String ariaCrypto(String input, String type) {
        EgovPasswordEncoder encoder = new EgovPasswordEncoder();
        EgovARIACryptoServiceImpl aria = new EgovARIACryptoServiceImpl();
        String hashPwd = encoder.encryptPassword(PASSWORD);

        encoder.setAlgorithm(ALGORISM);
        encoder.setHashedPassword(hashPwd);

        aria.setPasswordEncoder(encoder);
        aria.setBlockSize(BLOCK_SIZE);

        if("ENCODE".equals(type)) {
            byte[] encrypt = aria.encrypt(input.getBytes(CHAR_SET), PASSWORD);
            return new String(Base64.getEncoder().encode(encrypt), CHAR_SET);
        }

        byte[] decrypted = aria.decrypt(Base64.getDecoder().decode(input.getBytes(CHAR_SET)), PASSWORD);
        return new String(decrypted, CHAR_SET);
    }
}