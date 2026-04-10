import FormRegister from "../components/FormRegister"

const Registrarse = () => {
    return(
        <main className="d-flex justify-content-center align-items-center">
            <div className="col-12 col-sm-10 col-md-6">
                <section className="bg-light rounded-5 p-4 shadow text-center">
                    <h2>Registrarse</h2>
                    <FormRegister />
                </section>
            </div>
        </main>
    )
}

export default Registrarse