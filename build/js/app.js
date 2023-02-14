
const formulario=document.querySelector(".formulario");const titulo=formulario.querySelector('#titulo');const categoria=formulario.querySelector('#categoria');const precio=formulario.querySelector('#precio');const agregar=formulario.querySelector('#agregar');const agregarContenedor=document.querySelector('.agregar-contenedor');const anuncios=document.querySelector('.anuncios');const botonAgregar=document.querySelector('#boton-agregar')
const botonEnviar=document.querySelector('#boton-enviar')
const lista=document.querySelector('#lista')
let errores=[];let erroresFormulario=[];let erroresCategorias=[];let getCategorias;let getGastos;let gastoContenedor=[]
let nuevaCategoria='';let categoriaValida=false;window.addEventListener("load",function(){getCategorias=JSON.parse(localStorage.getItem("categoria"))??[];getGastos=JSON.parse(localStorage.getItem("gasto"))??[];nuevaCategoria=getCategorias
gastoContenedor=getGastos
agregarSecciones()
agregarLista()});const validacionCategoria=()=>{errores=[];if(agregar.value===""||agregar.value===null){errores.push('Debes escribir un valor de categoria.')}else{if(validarCategoria()){errores.push('Esta categoria ya existe')}else{errores=[];anuncios.innerHTML='';}}}
const validacionFormulario=()=>{errores=[];if(titulo.value===""||titulo.value===null){errores.push('Debes agregar un titulo.')}
if(precio.value===""||precio.value===null){errores.push('Debes agregar un precio.')}
if(getCategorias.length>0){if(categoria.selectedIndex<=0){errores.push('Debes seleccionar una categoria.')}}else{errores.push('Debes agregar una categoria.')}}
const mostrarErrores=()=>{anuncios.innerHTML="";errores.forEach(error=>anuncios.innerHTML+=`<p class="anuncio error"> ${error}</p>`);setTimeout(()=>{anuncios.innerHTML='';},4500);errores=[];}
const agregarSecciones=()=>{categoria.innerHTML=`<option disabled selected >---Seleccionar---</option>`;getCategorias.forEach((entry,key)=>categoria.innerHTML+=`<option value="${key}">${entry.categoria}</option>`);}
const agregarLista=()=>{lista.innerHTML='';getGastos.forEach((entry,key)=>{lista.innerHTML+=` <tr>
                                <td>${key+1}</td>
                                <td>${entry.titulo}</td>
                                <td>${entry.categoria}</td>
                                <td>$${entry.precio}</td>
                                <td class="botones-opciones">
                                    <div class="boton boton-rojo" id="boton-borrar">Borrar</div>
                                    <div class="boton boton-azul" id="boton-actualizar">Actualizar</div>
                                </td>
                            </tr>`});}
function CrearCategoria(categoria){this.categoria=categoria;}
const subirCategoria=()=>{const nombreCategoria=new CrearCategoria(agregar.value.toUpperCase());nuevaCategoria.push(nombreCategoria)
localStorage.setItem("categoria",JSON.stringify(nuevaCategoria));anuncios.innerHTML+=`<p class="anuncio bueno">la categoria "${agregar.value}" se agrego correctamente</p>`;setTimeout(()=>{anuncios.innerHTML='';},4500);agregarSecciones();agregar.value='';}
function NuevoGasto(titulo,categoria,precio){this.titulo=titulo,this.categoria=categoria,this.precio=precio}
const gastosStorage=()=>{const gasto=new NuevoGasto(titulo.value,categoria.options[categoria.selectedIndex].innerText,precio.value)
gastoContenedor.push(gasto)
localStorage.setItem('gasto',JSON.stringify(gastoContenedor))
agregarLista()
anuncios.innerHTML=`<p class="anuncio bueno">Se agrego correctamente</p>`;setTimeout(()=>{anuncios.innerHTML='';},4500);titulo.value='';precio.value='';categoria.selectedIndex=0;}
const validarCategoria=()=>{erroresCategorias=[];categoriaValida=false
for(let i=0;i<getCategorias.length;i++){if(getCategorias[i].categoria===agregar.value.toUpperCase()){categoriaValida=true;break;}}
return categoriaValida;}
botonAgregar.addEventListener('click',()=>{validacionCategoria()
errores.length>0?mostrarErrores():subirCategoria();})
botonEnviar.addEventListener('click',()=>{validacionFormulario()
errores.length>0?mostrarErrores():gastosStorage();})
formulario.addEventListener('submit',e=>e.preventDefault())