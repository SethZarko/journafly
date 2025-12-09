import { Link } from "react-router"

export const NotFound: React.FC = (): React.ReactNode => {
  return (
    <section style={{  
      width: '100%', 
      height: '100dvh',
      padding: '48px',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center'
     }}>
        <h1 style={{  fontSize: '80px' }}>404</h1>
        <Link to='/'>Return Home</Link>
    </section>
  )
}
