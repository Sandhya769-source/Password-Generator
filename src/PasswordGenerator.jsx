import { useState } from "react";
import {
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaSyncAlt,
  FaBolt,
  FaStar,
  FaMobileAlt,
} from "react-icons/fa";

import { generatePassword } from "./passwordUtils";
import { getPasswordStrength } from "./strengthUtils";
import { PASSWORD_CONFIG } from "./constants";
import Notification from "./Notification";

import "./PasswordGenerator.css";

function PasswordGenerator() {
  const [length, setLength] = useState(
    PASSWORD_CONFIG.defaultLength
  );

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  const createPassword = () => {
    const newPassword = generatePassword({
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
    });

    setPassword(newPassword);
    setCopied(false);
  };

  const copyPassword = async () => {
    if (!password) {
      return;
    }

    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy password:", error);
    }
  };

  const strength = getPasswordStrength({
    length,
    uppercase,
    lowercase,
    numbers,
    symbols,
  });

  return (
    <>
      <div className="header">
        <div className="shield-icon">
          <FaShieldAlt />
        </div>

        <h1>
          Password <span>Generator</span>
        </h1>

        <p>
          Create strong and secure passwords in seconds
        </p>
      </div>

      <main className="generator-card">

        {/* Password Length */}

        <section className="length-section">

          <div className="section-title-row">

            <h2>Password Length</h2>

            <div className="length-value">
              {length}
            </div>

            <span className="range-text">
              4 – 32
            </span>

          </div>

         <input
            type="range"
            min={PASSWORD_CONFIG.minLength}
            max={PASSWORD_CONFIG.maxLength}
            value={length}
            onChange={(event) =>
                setLength(Number(event.target.value))
            }
            className="range-slider"
            style={{
                "--progress": `${
                ((length - PASSWORD_CONFIG.minLength) /
                    (PASSWORD_CONFIG.maxLength -
                    PASSWORD_CONFIG.minLength)) *
                100
                }%`,
            }}
            />
        </section>

        {/* Character Options */}

        <section className="options-grid">

          <CharacterOption
            icon="A"
            label="Uppercase Letters (A–Z)"
            enabled={uppercase}
            onChange={() =>
              setUppercase(!uppercase)
            }
          />

          <CharacterOption
            icon="a"
            label="Lowercase Letters (a–z)"
            enabled={lowercase}
            onChange={() =>
              setLowercase(!lowercase)
            }
          />

          <CharacterOption
            icon="123"
            label="Numbers (0–9)"
            enabled={numbers}
            onChange={() =>
              setNumbers(!numbers)
            }
          />

          <CharacterOption
            icon="#"
            label="Special Characters (!@#...)"
            enabled={symbols}
            onChange={() =>
              setSymbols(!symbols)
            }
          />

        </section>

        {/* Password Display */}

        <section className="password-section">

          <div className="password-box">

            <span className="password-text">
              {password
                ? showPassword
                  ? password
                  : "•".repeat(password.length)
                : "Click Generate Password"}
            </span>

            <div className="password-actions">

              <button
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                title={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </button>

              <div className="divider"></div>

              <button
                onClick={copyPassword}
                title="Copy password"
              >
                <FaCopy />
              </button>

            </div>

          </div>

          {/* Strength */}

          <div className="strength-section">

            <div className="strength-header">

              <span>
                Password Strength
              </span>

              <strong>
                {strength.label}
              </strong>

            </div>

            <div className="strength-bar">

              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={
                    item <= strength.level
                      ? "strength active"
                      : "strength"
                  }
                ></div>
              ))}

            </div>

          </div>

        </section>

        {/* Buttons */}

        <section className="button-section">

          <button
            className="generate-btn"
            onClick={createPassword}
          >
            <FaSyncAlt />
            Generate Password
          </button>

          <button
            className="copy-btn"
            onClick={copyPassword}
          >
            <FaCopy />
            Copy Password
          </button>

        </section>

        {/* Features */}

        <section className="features">

          <Feature
            icon={<FaShieldAlt />}
            text="Secure"
          />

          <Feature
            icon={<FaBolt />}
            text="Fast"
          />

          <Feature
            icon={<FaStar />}
            text="Customizable"
          />

          <Feature
            icon={<FaMobileAlt />}
            text="Responsive"
          />

        </section>

      </main>

      {copied && (
        <Notification message="Password copied!" />
      )}
    </>
  );
}

function CharacterOption({
  icon,
  label,
  enabled,
  onChange,
}) {
  return (
    <div className="option">

      <div className="option-icon">
        {icon}
      </div>

      <span>
        {label}
      </span>

      <button
        className={`toggle ${
          enabled ? "active" : ""
        }`}
        onClick={onChange}
        aria-label={`Toggle ${label}`}
      >
        <span></span>
      </button>

    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="feature">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default PasswordGenerator;