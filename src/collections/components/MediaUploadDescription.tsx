export function MediaUploadDescription() {
  return (
    <div
      style={{
        marginBottom: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '4px',
        border: '1px solid var(--theme-border-color)',
        fontSize: '0.8125rem',
        lineHeight: '1.6',
        color: 'var(--theme-text)',
      }}
    >
      <strong>Max upload size: 4.5MB</strong>
      <br />
      To reduce image size before uploading, use{' '}
      <a href="https://squoosh.app" target="_blank" rel="noopener noreferrer">
        squoosh.app
      </a>.
    </div>
  )
}