export default function RegistrationButton({className, children}) {
    return(
        <button className={`${className}`}>
            {children}
        </button>
    )
}