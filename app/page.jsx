```jsx
export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "800px",
          textAlign: "center",
          background: "#ffffff",
          padding: "60px 30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "16px",
            color: "#111827",
          }}
        >
          NorthSky Auto
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#4b5563",
            marginBottom: "30px",
          }}
        >
          Test Homepage
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "12px 20px",
            borderRadius: "8px",
            background: "#dcfce7",
            color: "#166534",
            fontWeight: "600",
          }}
        >
          ✓ Homepage Loaded Successfully
        </div>

        <p
          style={{
            marginTop: "30px",
            color: "#6b7280",
            fontSize: "15px",
          }}
        >
          This is a minimal production test page for NorthSky Auto.
        </p>
      </section>
    </main>
  );
}
```
