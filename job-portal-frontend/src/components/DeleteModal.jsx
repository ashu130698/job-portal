export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          width: 380,
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: 8 }}>Delete Job</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
          Are you sure you want to delete this job?
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 28px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 28px",
              borderRadius: 999,
              border: "none",
              background: "var(--red)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}