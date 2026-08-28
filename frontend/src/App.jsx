import { useState } from "react";
import "./App.css";

const initialData = {
  duration: 0,
  protocol_type: "tcp",
  service: "ftp_data",
  flag: "SF",

  src_bytes: 491,
  dst_bytes: 0,
  land: 0,
  wrong_fragment: 0,
  urgent: 0,
  hot: 0,

  num_failed_logins: 0,
  logged_in: 0,
  num_compromised: 0,
  root_shell: 0,
  su_attempted: 0,
  num_root: 0,
  num_file_creations: 0,
  num_shells: 0,
  num_access_files: 0,
  num_outbound_cmds: 0,
  is_host_login: 0,
  is_guest_login: 0,

  count: 2,
  srv_count: 2,
  serror_rate: 0,
  srv_serror_rate: 0,
  rerror_rate: 0,
  srv_rerror_rate: 0,
  same_srv_rate: 1,
  diff_srv_rate: 0,
  srv_diff_host_rate: 0,

  dst_host_count: 150,
  dst_host_srv_count: 25,
  dst_host_same_srv_rate: 0.17,
  dst_host_diff_srv_rate: 0.03,
  dst_host_same_src_port_rate: 0.17,
  dst_host_srv_diff_host_rate: 0,
  dst_host_serror_rate: 0,
  dst_host_srv_serror_rate: 0,
  dst_host_rerror_rate: 0.05,
  dst_host_srv_rerror_rate: 0
};

const services = [
  "IRC",
  "X11",
  "Z39_50",
  "aol",
  "auth",
  "bgp",
  "courier",
  "csnet_ns",
  "ctf",
  "daytime",
  "discard",
  "domain",
  "domain_u",
  "echo",
  "eco_i",
  "ecr_i",
  "efs",
  "exec",
  "finger",
  "ftp",
  "ftp_data",
  "gopher",
  "harvest",
  "hostnames",
  "http",
  "http_2784",
  "http_443",
  "http_8001",
  "imap4",
  "iso_tsap",
  "klogin",
  "kshell",
  "ldap",
  "link",
  "login",
  "mtp",
  "name",
  "netbios_dgm",
  "netbios_ns",
  "netbios_ssn",
  "netstat",
  "nnsp",
  "nntp",
  "ntp_u",
  "other",
  "pm_dump",
  "pop_2",
  "pop_3",
  "printer",
  "private",
  "red_i",
  "remote_job",
  "rje",
  "shell",
  "smtp",
  "sql_net",
  "ssh",
  "sunrpc",
  "supdup",
  "systat",
  "telnet",
  "tftp_u",
  "tim_i",
  "time",
  "urh_i",
  "urp_i",
  "uucp",
  "uucp_path",
  "vmnet",
  "whois"
];

const flags = [
  "OTH",
  "REJ",
  "RSTO",
  "RSTOS0",
  "RSTR",
  "S0",
  "S1",
  "S2",
  "S3",
  "SF",
  "SH"
];

function App() {
  const [formData, setFormData] = useState(initialData);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "protocol_type" ||
        name === "service" ||
        name === "flag"
          ? value
          : Number(value)
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const result = await response.json();

      setPrediction(result);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the NIDS backend. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setPrediction(null);
    setError("");
  };

  const numericField = (name, label) => (
    <div className="input-group">
      <label>{label}</label>

      <input
        type="number"
        step="any"
        name={name}
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  const isNormal =
    prediction?.prediction === "Normal";

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            🛡️
          </div>

          <div>
            <h1>Network Intrusion Detection System</h1>

            <p>
              Machine Learning Based Network Security Monitoring
            </p>
          </div>

        </div>

        <div className="status">

          <span className="status-dot"></span>

          System Online

        </div>

      </header>


      <main className="dashboard">

        {/* HERO */}

        <section className="card welcome-card">

          <div className="hero-content">

            <div>

              <span className="section-label">
                AI-POWERED NETWORK SECURITY
              </span>

              <h2>
                Detect Network Intrusions
                <br />
                Before They Become a Threat
              </h2>

              <p>
                Analyze network traffic using a Random Forest
                machine learning model trained on the NSL-KDD
                intrusion detection dataset.
              </p>

            </div>

            <div className="hero-shield">
              🛡️
            </div>

          </div>

        </section>


        {/* MODEL INTELLIGENCE */}

        <section className="model-section">

          <div className="model-header">

            <div>

              <span className="section-label">
                MODEL INTELLIGENCE
              </span>

              <h2>
                Detection Engine
              </h2>

            </div>

            <div className="model-active">

              <span className="active-dot"></span>

              Model Active

            </div>

          </div>


          <div className="model-grid">

            {/* MODEL */}

            <div className="model-card primary-model">

              <div className="model-icon">
                🧠
              </div>

              <div>

                <span className="model-label">
                  Machine Learning Model
                </span>

                <strong>
                  Random Forest
                </strong>

              </div>

            </div>


            {/* FEATURES */}

            <div className="model-card">

              <div className="stat-icon">
                ◈
              </div>

              <div>

                <span className="model-label">
                  Input Features
                </span>

                <strong>
                  41
                </strong>

                <small>
                  NSL-KDD attributes
                </small>

              </div>

            </div>


            {/* TREES */}

            <div className="model-card">

              <div className="stat-icon">
                ◎
              </div>

              <div>

                <span className="model-label">
                  Estimators
                </span>

                <strong>
                  100
                </strong>

                <small>
                  Decision trees
                </small>

              </div>

            </div>


            {/* DATASET */}

            <div className="model-card">

              <div className="stat-icon">
                ▣
              </div>

              <div>

                <span className="model-label">
                  Training Dataset
                </span>

                <strong>
                  NSL-KDD
                </strong>

                <small>
                  Network intrusion data
                </small>

              </div>

            </div>

          </div>


          {/* PIPELINE */}

          <div className="pipeline">

            <div className="pipeline-title">
              Detection Pipeline
            </div>

            <div className="pipeline-flow">

              <div className="pipeline-node">

                <span>01</span>

                <strong>
                  Traffic
                </strong>

                <small>
                  Input
                </small>

              </div>


              <div className="pipeline-line"></div>


              <div className="pipeline-node">

                <span>02</span>

                <strong>
                  Preprocess
                </strong>

                <small>
                  Encode + Scale
                </small>

              </div>


              <div className="pipeline-line"></div>


              <div className="pipeline-node">

                <span>03</span>

                <strong>
                  Random Forest
                </strong>

                <small>
                  100 Trees
                </small>

              </div>


              <div className="pipeline-line"></div>


              <div className="pipeline-node">

                <span>04</span>

                <strong>
                  Detection
                </strong>

                <small>
                  Normal / Attack
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* BASIC CONNECTION */}

        <section className="card">

          <div className="card-heading">

            <div className="heading-icon">
              🔗
            </div>

            <div>

              <h2>
                Basic Connection Information
              </h2>

              <p>
                Core network connection characteristics
              </p>

            </div>

          </div>


          <div className="form-grid">

            {numericField(
              "duration",
              "Duration"
            )}


            <div className="input-group">

              <label>
                Protocol Type
              </label>

              <select
                name="protocol_type"
                value={formData.protocol_type}
                onChange={handleChange}
              >

                <option value="tcp">
                  TCP
                </option>

                <option value="udp">
                  UDP
                </option>

                <option value="icmp">
                  ICMP
                </option>

              </select>

            </div>


            <div className="input-group">

              <label>
                Service
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >

                {services.map((service) => (

                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>

                ))}

              </select>

            </div>


            <div className="input-group">

              <label>
                Flag
              </label>

              <select
                name="flag"
                value={formData.flag}
                onChange={handleChange}
              >

                {flags.map((flag) => (

                  <option
                    key={flag}
                    value={flag}
                  >
                    {flag}
                  </option>

                ))}

              </select>

            </div>


            {numericField(
              "src_bytes",
              "Source Bytes"
            )}

            {numericField(
              "dst_bytes",
              "Destination Bytes"
            )}

          </div>

        </section>


        {/* CONTENT & SECURITY */}

        <section className="card">

          <div className="card-heading">

            <div className="heading-icon">
              🔐
            </div>

            <div>

              <h2>
                Content & Security Features
              </h2>

              <p>
                Host-level security and authentication indicators
              </p>

            </div>

          </div>


          <div className="form-grid">

            {numericField("land", "Land")}

            {numericField(
              "wrong_fragment",
              "Wrong Fragment"
            )}

            {numericField(
              "urgent",
              "Urgent"
            )}

            {numericField(
              "hot",
              "Hot"
            )}

            {numericField(
              "num_failed_logins",
              "Failed Logins"
            )}

            {numericField(
              "logged_in",
              "Logged In"
            )}

            {numericField(
              "num_compromised",
              "Compromised"
            )}

            {numericField(
              "root_shell",
              "Root Shell"
            )}

            {numericField(
              "su_attempted",
              "SU Attempted"
            )}

            {numericField(
              "num_root",
              "Number of Root"
            )}

            {numericField(
              "num_file_creations",
              "File Creations"
            )}

            {numericField(
              "num_shells",
              "Shells"
            )}

            {numericField(
              "num_access_files",
              "Access Files"
            )}

            {numericField(
              "num_outbound_cmds",
              "Outbound Commands"
            )}

            {numericField(
              "is_host_login",
              "Host Login"
            )}

            {numericField(
              "is_guest_login",
              "Guest Login"
            )}

          </div>

        </section>


        {/* TRAFFIC STATISTICS */}

        <section className="card">

          <div className="card-heading">

            <div className="heading-icon">
              📊
            </div>

            <div>

              <h2>
                Traffic Statistics
              </h2>

              <p>
                Connection and service-level traffic patterns
              </p>

            </div>

          </div>


          <div className="form-grid">

            {numericField(
              "count",
              "Connection Count"
            )}

            {numericField(
              "srv_count",
              "Service Count"
            )}

            {numericField(
              "serror_rate",
              "SYN Error Rate"
            )}

            {numericField(
              "srv_serror_rate",
              "Service SYN Error Rate"
            )}

            {numericField(
              "rerror_rate",
              "REJ Error Rate"
            )}

            {numericField(
              "srv_rerror_rate",
              "Service REJ Error Rate"
            )}

            {numericField(
              "same_srv_rate",
              "Same Service Rate"
            )}

            {numericField(
              "diff_srv_rate",
              "Different Service Rate"
            )}

            {numericField(
              "srv_diff_host_rate",
              "Different Host Rate"
            )}

          </div>

        </section>


        {/* DESTINATION HOST */}

        <section className="card">

          <div className="card-heading">

            <div className="heading-icon">
              🖥️
            </div>

            <div>

              <h2>
                Destination Host Statistics
              </h2>

              <p>
                Destination host behavior and error patterns
              </p>

            </div>

          </div>


          <div className="form-grid">

            {numericField(
              "dst_host_count",
              "Destination Host Count"
            )}

            {numericField(
              "dst_host_srv_count",
              "Destination Host Service Count"
            )}

            {numericField(
              "dst_host_same_srv_rate",
              "Same Service Rate"
            )}

            {numericField(
              "dst_host_diff_srv_rate",
              "Different Service Rate"
            )}

            {numericField(
              "dst_host_same_src_port_rate",
              "Same Source Port Rate"
            )}

            {numericField(
              "dst_host_srv_diff_host_rate",
              "Service Different Host Rate"
            )}

            {numericField(
              "dst_host_serror_rate",
              "Host SYN Error Rate"
            )}

            {numericField(
              "dst_host_srv_serror_rate",
              "Host Service SYN Error Rate"
            )}

            {numericField(
              "dst_host_rerror_rate",
              "Host REJ Error Rate"
            )}

            {numericField(
              "dst_host_srv_rerror_rate",
              "Host Service REJ Error Rate"
            )}

          </div>

        </section>


        {/* ACTIONS */}

        <div className="action-buttons">

          <button
            className="predict-button"
            onClick={handlePredict}
            disabled={loading}
          >

            <span>
              {loading ? "⏳" : "⚡"}
            </span>

            {loading
              ? "Analyzing Traffic..."
              : "Analyze Network Traffic"}

          </button>


          <button
            className="reset-button"
            onClick={handleReset}
          >

            ↻ Reset

          </button>

        </div>


        {/* ERROR */}

        {error && (

          <section className="card error-card">

            <div className="error-icon">
              ⚠️
            </div>

            <div>

              <h3>
                Connection Error
              </h3>

              <p>
                {error}
              </p>

            </div>

          </section>

        )}


        {/* RESULT */}

        {prediction && (

          <section className="card result-card">

            <div className="result-header">

              <div>

                <span className="section-label">
                  ANALYSIS COMPLETE
                </span>

                <h2>
                  Detection Result
                </h2>

              </div>

              <div className="result-time">
                LIVE ANALYSIS
              </div>

            </div>


            <div
              className={
                isNormal
                  ? "result-container normal-result"
                  : "result-container attack-result"
              }
            >

              <div className="result-icon">

                {isNormal
                  ? "🟢"
                  : "🔴"}

              </div>


              <div
                className={
                  isNormal
                    ? "result-status normal"
                    : "result-status attack"
                }
              >

                {isNormal
                  ? "NORMAL TRAFFIC"
                  : "ATTACK DETECTED"}

              </div>


              <div className="confidence">

                Model Confidence:{" "}

                <strong>
                  {prediction.confidence}%
                </strong>

              </div>


              <p className="result-message">

                {isNormal
                  ? "No network intrusion was detected in the analyzed traffic."
                  : "Potential malicious network activity has been detected. Investigate this traffic immediately."}

              </p>

            </div>

          </section>

        )}

      </main>


      {/* FOOTER */}

      <footer className="footer">

        <span>
          NIDS • Machine Learning Security System
        </span>

        <span>
          Random Forest • NSL-KDD • FastAPI • React
        </span>

      </footer>

    </div>
  );
}

export default App;