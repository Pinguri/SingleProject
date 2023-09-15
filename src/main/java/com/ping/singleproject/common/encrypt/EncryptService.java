package com.ping.singleproject.common.encrypt;

public interface EncryptService {
    String sha256Encrypt(String input);

    String bCryptHashing(String input);

    boolean isBCryptPasswordMatch(String original, String hash);

    String aes256Dec(String input);

    String ariaEncrypt(String input);

    String ariaDecrypted(String input);
}
