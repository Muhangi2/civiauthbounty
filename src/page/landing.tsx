import { UserButton } from "@civic/auth/react";

export function TitleBar() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f0f0f0",
          borderBottom: "2px solid #ccc",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          My AFDGFGpp
        </h1>
        <div
          style={{
            padding: "5px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "500",
            textAlign: "center",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          <UserButton />
        </div>
      </div>
    );
  }


