// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const modaDelAño = {
  nombre: "Polera de temporada",
  precio: 50,
  categoria: "poleras",
  stock: 40,
  disponible: true,
};

console.log(modaDelAño.nombre);

const propiedad = "precio";
console.log(modaDelAño[propiedad]);

modaDelAño.stock = 35;
modaDelAño.integral = false;
delete modaDelAño.integral;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = modaDelAño;
console.log(`${nombre} cuesta Bs ${precio}`);

const ropaDeAyer = { ...modaDelAño, precio: 35, nombre: "Polera de la temporada pasada" };
console.log(ropaDeAyer);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  { nombre: "poleras talla L,M,XL", precio: 50, categoria: "poleras", stock: 40, disponible: true, imagen: "polera1.jpg" },
  { nombre: "pantalon masculino talla M,L,S", precio: 120, categoria: "pantalon masculino", stock: 25, disponible: true, imagen: "pantalon.jpg" },
  { nombre: "polerones talla M,L", precio: 150, categoria: "polerones", stock: 8, disponible: true, imagen: "poleron1.jpg" },
  { nombre: "vestidos talla M,L", precio: 180, categoria: "vestidos", stock: 0, disponible: false, imagen: "vestidos.jpg" },
  { nombre: "trajes talla M,L,XL", precio: 350, categoria: "trajes", stock: 30, disponible: true, imagen: "trajes.jpg" },
  { nombre: "chaquetas talla M,L,XL", precio: 120, categoria: "chaquetas", stock: 2, disponible: true, imagen: "chaquetas.jpg" },
  { nombre: "pantalon femenino", precio: 180, categoria: "pantalon femenino", stock: 50, disponible: true, imagen: "pantalonfemenino.jpg" },
  { nombre: "ropa de niños", precio: 80, categoria: "niños", stock: 100, disponible: true, imagen: "ropa-de-ninos.jpg" },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const caro = productos.find(p => p.precio > 40);
console.log(caro);

console.log(nombres.includes("trajes talla M,L,XL"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalpantalonmasculinoStock = productos
  .filter(p => p.categoria === "pantalon masculino" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("pantalon masculino en stock: Bs", totalpantalonmasculinoStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const corto = new Producto("Corto", 50, 50);
console.log(corto.nombre, corto.estaDisponible(), corto.valorEnStock());

const Goras = new Producto("Goras", 50, 50);
console.log(Goras.nombre, Goras.estaDisponible(), Goras.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const goras = new ProductoConDescuento("goras", 20, 100, 15);
console.log(goras.precioFinal(), goras.estaDisponible());