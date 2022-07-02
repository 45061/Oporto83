export default function NavBar({ children }) {
  return (
    <>
      <nav>{children}</nav>
      <style jsx>
        {`
          nav {
            display: flex;
          }
        `}
      </style>
    </>
  );
}
