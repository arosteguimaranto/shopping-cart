// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector(" #lista-cursos");
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de localStorage[]
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; // reseteamos el carrito

        limpiarHTML(); // Eliminamos todo el HTML
    })
}



//Funciones
function agregarCurso(e){
    e.preventDefault()


    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        }

}

//Elimina un curso del carrito
function eliminarCurso(e) {

    if(e.target.classList.contains('borrar-curso')) {
       const cursoId = e.target.getAttribute('data-id');

       // Eliminar del arreglo de articulosCarrito por el data-id
       articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
       
       console.log(articulosCarrito);

       carritoHTML(); // iterar sobre el carrito y mostrar su html

    }
}

// Leer datos del curso
// lo ideal es ir dividiendo el problema    


// Lee el contenido HTML l que le damos click y extrae la informacion del curso

function leerDatosCurso (curso) {
    //console.log(curso);


    // crear  un objeto con el contenido del curso actual
    
    const infoCurso = { 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        Precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya  existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map(curso =>{
        if (curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; //Retorna el objeto actualizado
        } else{
            return curso; // Retorna los objetos que no son duplicados
        }
    });
    articulosCarrito=[...cursos];
} else{
    //Agrega elementos al arreglo del carrito 
    articulosCarrito = [...articulosCarrito, infoCurso] ;



}
console.log(articulosCarrito);
carritoHTML();
}





//Mostrando en el carrito el curso seleccionado en html
function carritoHTML() {

//Limpiar el HTML
limpiarHTML();

//Recorre el carrito y genera el HTML


    articulosCarrito.forEach( curso => {
        console.log(curso);
 const row = document.createElement('tr');
 row.innerHTML =`
 
 <td>
     <img src= "${curso.imagen}" width="100">
 </td>
<td>${curso.titulo}</td>
<td>${curso.precio}</td>
<tb>${curso.cantidad}</td>
<td>
<a href="#" class="borrar-curso" data-id="${curso.id}"  > X </a>
</td>

 `;


 // Agrega el HTML del carrito en el tbody
 contenedorCarrito.appendChild(row);


    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();


}





function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

/*FORMA LENTA
Elimina los cursos del tbody
function LimpiarHTML() {
    contenedorCarrito.innerHTML = '';

}
*/



//Elimina los cursos del tbody
// se recomienda utilizar el while, siempre y cuabdo uno de los objetos cumpla con alguna condicion
function limpiarHTML() {


    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

