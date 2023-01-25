import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";

class Personajes extends Component {
  state = {
    personajes: [],
    filtro: [],
    paginaActual: 1,
    paginacion: 12,
  };

  componentDidMount() {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        this.setState({
          personajes: res.data.results,
          filtro: res.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  buscar = (event) => {
    const busqueda = event.target.value.toLowerCase();
    const filtro = this.state.personajes.filter((personaje) => {
      return (
        personaje.name.toLowerCase().includes(busqueda) ||
        personaje.species.toLowerCase().includes(busqueda) ||
        personaje.status.toLowerCase().includes(busqueda) ||
        personaje.origin.name.toLowerCase().includes(busqueda) ||
        personaje.created.toLowerCase().includes(busqueda)
      );
    });
    this.setState({ filtro });
  };

  cambioPagina = (data) => {
    this.setState({ paginaActual: data.selected + 1 });
  };
  render() {
    const { filtro, paginaActual, paginacion } = this.state;

    // Logic for displaying current characters
    const indiceFinal = paginaActual * paginacion;
    const indiceInicial = indiceFinal - paginacion;
    const personajesActuales = filtro.slice(indiceInicial, indiceFinal);

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              placeholder="Buscar..."
              onChange={this.buscar}
              className="w-100 mt-4 mb-4"
            />
          </div>
        </div>
        <div className="row">
          {personajesActuales.map((personaje) => {
            return (
              <div
                key={personaje.id}
                className="col-sm-12 col-md-6 col-lg-3 mb-3"
              >
                <div className="card" style={{ display: "flex" }}>
                  <img
                    style={{ width: "70%", margin: "auto", paddingTop: "10px" }}
                    className="card-img-top rounded-circle"
                    src={personaje.image}
                    alt={personaje.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title" style={{ textAlign: "center" }}>
                      {personaje.name}
                    </h3>
                    <hr />
                    <p className="card-text">
                      <b>Especie:</b> {personaje.species}
                    </p>
                    <p className="card-text">
                      <b>Estado:</b> {personaje.status}
                    </p>
                    <p className="card-text">
                      <b>Genero:</b> {personaje.gender}
                    </p>
                    <p className="card-text">
                      <b>Origen:</b> {personaje.origin.name}
                    </p>
                    <p className="card-text">
                      <b>localización:</b> {personaje.location.name}
                    </p>
                    <p className="card-text">
                      <b>Fecha creación:</b> {personaje.created}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          previousLabel={"previa"}
          nextLabel={"siguiente"}
          breakLabel={"..."}
          pageCount={Math.ceil(filtro.length / paginacion)}
          onPageChange={this.cambioPagina}
          containerClassName={"pagination justify-content-center pagination-sm"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default Personajes;
