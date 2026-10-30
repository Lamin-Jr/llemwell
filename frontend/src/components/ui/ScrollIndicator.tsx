export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div
        className="w-px h-[30px]"
        style={{
          backgroundColor: 'var(--foreground)',
          opacity: 0.4,
          animation: 'scrollPulse 2.4s ease-in-out infinite',
        }}
      />
    </div>
  );
}
