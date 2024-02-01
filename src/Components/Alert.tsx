interface Props {
    children : string ;
}

const Alert = ({children} : Props) => {
  return (
    <div className="alert alert-primary alert-dismissible"> {children} </div>
  )
}

export default Alert;