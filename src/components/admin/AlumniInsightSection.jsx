export default function AlumniInsightSection() {
  const companies = [
    {
      name: "Tech Nusantara Ltd.",
      location: "Jakarta, Indonesia",
      total: 124,
    },
    {
      name: "Global Innovation Inc.",
      location: "Bandung, Indonesia",
      total: 98,
    },
    {
      name: "Creative Digital Agency",
      location: "Remote",
      total: 76,
    },
    {
      name: "Manufacture Pro",
      location: "Surabaya, Indonesia",
      total: 54,
    },
    {
      name: "State Bank Persero",
      location: "Jakarta, Indonesia",
      total: 42,
    },
  ];

  const regions = [
    { name: "DKI Jakarta", value: 45 },
    { name: "Jawa Barat", value: 28 },
    { name: "Banten", value: 15 },
    { name: "Jawa Timur", value: 8 },
    { name: "Luar Negeri", value: 4 },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.grid}>
        {/* LEFT */}
        <div style={styles.card}>
          <h3 style={styles.title}>5 Perusahaan Perekrut Teratas</h3>

          {companies.map((company, index) => (
            <div key={index} style={styles.companyItem}>
              <div>
                <div style={styles.companyName}>{company.name}</div>
                <div style={styles.companyLocation}>{company.location}</div>
              </div>

              <div style={styles.badge}>{company.total} Alumni</div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div style={styles.card}>
          <h3 style={styles.title}>Distribusi Geografis (5 Teratas)</h3>

          {regions.map((region, index) => (
            <div key={index} style={{ marginBottom: 18 }}>
              <div style={styles.regionHeader}>
                <span>{region.name}</span>
                <span>{region.value}%</span>
              </div>

              <div style={styles.progressBg}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${region.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginTop: 30,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  title: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 600,
  },

  companyItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: 10,
    background: "#f8fafc",
    marginBottom: 10,
  },

  companyName: {
    fontWeight: 600,
  },

  companyLocation: {
    fontSize: 12,
    color: "#64748b",
  },

  badge: {
    background: "#e2e8f0",
    padding: "4px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
  },

  regionHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: 6,
  },

  progressBg: {
    background: "#e5e7eb",
    height: 8,
    borderRadius: 6,
  },

  progressFill: {
    background: "#334155",
    height: 8,
    borderRadius: 6,
  },
};
