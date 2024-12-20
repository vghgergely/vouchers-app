package com.wecan.vouchers.exceptions;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class ApiExceptionHandler {
    private static final Logger logger = Logger.getLogger(ApiExceptionHandler.class.getName());

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception e) {
        logger.severe("An error occurred");
        return buildResponseEntity(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException e) {
        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST, e.getMessage()));
    }

    @ExceptionHandler(VoucherException.class)
    public ResponseEntity<Object> handleVoucherException(VoucherException e) {
        String message = "Voucher exception occurred: " + e.getMessage();
        logger.log(Level.SEVERE, message);
        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST, message));
    }

    @ExceptionHandler(VoucherNotFoundException.class)
    public ResponseEntity<Object> handleVoucherNotFoundException(VoucherNotFoundException e) {
        String message = "Voucher not found: " + e.getVoucherCode();
        logger.log(Level.SEVERE, "Voucher {0} not found", e.getVoucherCode());
        return buildResponseEntity(new ApiError(HttpStatus.NOT_FOUND, message));
    }

    @ExceptionHandler(VoucherAlreadyRedeemedException.class)
    public ResponseEntity<Object> handleVoucherAlreadyRedeemedException(VoucherAlreadyRedeemedException e) {
        String message = "Voucher already redeemed: " + e.getVoucherCode();
        logger.log(Level.SEVERE, "Voucher {0} already redeemed", e.getVoucherCode());
        return buildResponseEntity(new ApiError(HttpStatus.CONFLICT, message));
    }

    @ExceptionHandler(VoucherExpiredException.class)
    public ResponseEntity<Object> handleVoucherExpiredException(VoucherExpiredException e) {
        String message = "Voucher expired: " + e.getVoucherCode();
        logger.log(Level.SEVERE, "Voucher {0} expired", e.getVoucherCode());
        return buildResponseEntity(new ApiError(HttpStatus.GONE, message));
    }

    @ExceptionHandler(VoucherAlreadyExistsException.class)
    public ResponseEntity<Object> handleVoucherAlreadyExistsException(VoucherAlreadyExistsException e) {
        String message = "Voucher already exists: " + e.getVoucherCode();
        return buildResponseEntity(new ApiError(HttpStatus.CONFLICT, message));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException e) {
        return buildResponseEntity(new ApiError(HttpStatus.UNAUTHORIZED, e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        String detailedMessage = errors.entrySet().stream()
                .map(entry -> entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.joining(", "));

        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, "Input validation failed: " + detailedMessage, ex);
        apiError.setValidationErrors(errors);
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}