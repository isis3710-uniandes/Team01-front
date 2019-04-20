import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from 'axios'

export class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            email: "",
            usuario: []
        };
    }//.filter(usuario=>usuario.username===this.state.username)

    setLogedUser = (e) => {
        console.log("login1")
        e.preventDefault();
        console.log("login2")
        axios
            .get('http://localhost:3000/api/obtainall')
            .then(res => {
                const use = res.data.filter(usuario => usuario.username === this.state.user)[0]
                if (use) {
                    this.setState({ usuario: use })
                    console.log(this.state.usuario)
                    if (this.state.usuario.password === this.state.password) {
                        localStorage.setItem("username", this.state.user)
                        localStorage.setItem("user", this.state.usuario)
                        localStorage.setItem("login", "true")
                        localStorage.setItem("id", this.state.usuario._id)
                        console.log(this.state.usuario._id)
                        console.log("Todobien")

                    }
                    else {
                        localStorage.setItem("login", "false")
                        console.log("PassIncorrecto")
                        alert("Usuario o Password Incorrectos")
                        localStorage.setItem("username", "")
                        localStorage.setItem("id", "")

                    }
                } else {
                    console.log("usuario Inva")
                    alert("Usuario o Password Incorrectos")
                    localStorage.setItem("login", "false")
                    localStorage.setItem("username", "")
                    localStorage.setItem("id", "")

                }
                window.location.reload();


            })

    }
    registerUser = (e) => {
        console.log("registro1")
        e.preventDefault();
        console.log("registro2")
        axios
            .post('http://localhost:3000/api/register', { id: (Math.random() * 10000000000) + 200, email: this.state.email, username: this.state.user, password: this.state.password })
            .then(res => {
                console.log(res.data)
                alert("Usuario Creado, puede hacer Log in")
                window.location.reload();

                this.setState({ usuario: res.data })
            }).catch(err => {
                alert(err.response.data)
                console.log(err.response.data)
            })


    }
    setLogin = (login) => {
        localStorage.setItem("login", login ? "true" : "false")
        localStorage.setItem("username", "")
        localStorage.setItem("id", "")
        window.location.reload();
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {

        return (


            <nav className="navbar navbar-expand-sm navbar-dark navbar-custom p-0">
                <Link to="/" className="navbar-brand">The Math Games!</Link>
                <li className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </li>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/partidas">Partidas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quiz">Preguntas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/materias">Materias</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/habilidades">Habilidades</Link>
                        </li>
                        {localStorage.getItem("login") === "true" && <li className="nav-item">
                            <p className="nav-link blog" to="/">{"Bienvenido " + localStorage.getItem("username")}</p>
                        </li>}
                        {localStorage.getItem("login") === "true" && <li className="btn btn-danger btn-large" onClick={() => this.setLogin(false)}>Salir</li>}
                    </ul>
                    {localStorage.getItem("login") !== "true" && <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-3 order-md-5"><a href="/home" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-3">
                            <button type="button" id="dropdownMenu1" data-toggle="dropdown" className="btn btn-outline-secondary btn-info dropdown-toggle">Registrarse <span className="caret"></span></button>
                            <ul className="dropdown-menu dropdown-menu-right mt-2">
                                <li className="px-3 py-2">
                                    <form className="form" onSubmit={this.registerUser}>
                                        <div className="form-group">
                                        <label>
                                            Nombre de usuario:
                                            <input className="form-control form-control-sm" type="text" required onChange={this.onChange} name="user" value={this.state.user} />
                                        </label>
                                        </div>
                                        <div className="form-group">
                                        <label>
                                            Correo Electronico:
                                            <input  className="form-control form-control-sm" type="email" required onChange={this.onChange} name="email" value={this.state.email} />
                                        </label>
                                        </div>
                                        <div className="form-group">
                                        <label>
                                            Contraseña:
                                            <input id="passwordInput1" className="form-control form-control-sm" type="password" required onChange={this.onChange} name="password" value={this.state.password} />
                                        </label>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-dark btn-block">Registrarse</button>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>}
                    {localStorage.getItem("login") !== "true" && <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-3 order-md-5"><a href="/home" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-3">
                            <button type="button" id="dropdownMenu2" data-toggle="dropdown" className="btn btn-outline-secondary btn-success dropdown-toggle">Ingresar <span className="caret"></span></button>
                            <ul className="dropdown-menu dropdown-menu-right mt-2">
                                <li className="px-3 py-2">
                                    <form className="form" onSubmit={this.setLogedUser}>
                                        <div className="form-group">
                                        <label>
                                            Nombre de usuario:
                                            <input  className="form-control form-control-sm" type="text" required onChange={this.onChange} name="user" value={this.state.user} />
                                        </label>
                                        </div>
                                        <div className="form-group">
                                        <label>
                                            Contraseña:
                                            <input id="passwordInput2"  className="form-control form-control-sm" type="password" required onChange={this.onChange} name="password" value={this.state.password} />
                                        </label>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-dark btn-block">Ingresar</button>
                                        </div>
                                        
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>}
                </div>
            </nav>)
    }
};

export default Toolbar;
