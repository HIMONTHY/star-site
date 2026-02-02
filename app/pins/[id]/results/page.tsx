.trinity-results {
  max-width: 950px;
  margin: 70px auto;
  color: white;
}

.trinity-results h1 {
  font-size: 38px;
  margin-bottom: 26px;
}

.trinity-card {
  background: #0b0e14;
  border: 1px solid #1d2636;
  border-radius: 18px;
  padding: 18px 20px;
  margin-bottom: 18px;
  transition: all 0.25s ease;
}

.trinity-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(47,129,247,0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.card-header h3 {
  font-size: 20px;
}

.icon {
  font-size: 20px;
}

/* STATUS COLORS */

.trinity-card.clean {
  border-color: #1eb673;
}

.trinity-card.clean .icon {
  color: #1eb673;
}

.trinity-card.warning {
  border-color: #f5c451;
}

.trinity-card.warning .icon {
  color: #f5c451;
}

.trinity-card.danger {
  border-color: #ff5c5c;
}

.trinity-card.danger .icon {
  color: #ff5c5c;
}

.trinity-card pre {
  color: #cfd8dc;
  font-size: 14px;
  white-space: pre-wrap;
  margin-top: 6px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: white;
}
