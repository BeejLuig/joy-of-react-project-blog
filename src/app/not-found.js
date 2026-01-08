import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 Not Found</h2>
      <p>This page does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}