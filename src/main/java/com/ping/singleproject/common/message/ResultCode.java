package com.ping.singleproject.common.message;

public class ResultCode {
    public static final String RESULT;
    public static final String RESULT_CODE;
    public static final String MSG;
    public static final String SUCCESS;
    public static final String ERROR;
    public static final String EXPIRED;
    public static final String SYSTEM_STOP;
    public static final String FAIL;
    public static final String NO_ISBN;
    public static final String NO_RECON;

    static {
        RESULT = "result";
        RESULT_CODE = "result_code";
        MSG = "msg";
        SUCCESS = "success";
        ERROR = "error";
        EXPIRED = "expired";
        SYSTEM_STOP = "system_stop";
        FAIL = "fail";
        NO_ISBN = "no_isbn";
        NO_RECON = "no_recon";
    }
}
