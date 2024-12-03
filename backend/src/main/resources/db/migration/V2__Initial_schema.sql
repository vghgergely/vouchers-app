-- B2__Initial_schema.sql
CREATE TABLE IF NOT EXISTS vouchers (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    redemption_count INT NOT NULL,
    max_redemption_count INT NOT NULL,
    voucher_status VARCHAR(50) NOT NULL CHECK (voucher_status IN ('ACTIVE', 'REDEEMED', 'EXPIRED')),
    expiry_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('OPERATOR', 'CLIENT'))
);

INSERT INTO users (name, role) VALUES ('operator', 'OPERATOR'), ('client', 'CLIENT');