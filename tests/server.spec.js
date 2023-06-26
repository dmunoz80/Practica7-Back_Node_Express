const request = require("supertest");
const server = require("../index");

describe("Pruebas de rutas existentes en la API", () => {

    it("Obtener status code 200 al consultar listado de cafés", async () => {
        const res = await request(server).get("/cafes").send();
        
        const status = res.statusCode;
        const producto = res.body;
        const charLength = producto.length;

        expect(status).toBe(200);
        expect(producto).toBeInstanceOf(Array);
        expect(charLength).toBeGreaterThan(0);
    })

    it("Obtener status code 404 al eliminar producto con ID inexistente", async () => {
        const jwt = "token";
        const idToDelete = "123456";
        const res = await request(server).delete(`/cafes/${idToDelete}`).set("Authorization", jwt).send();

        expect(res.statusCode).toBe(404);
    })

    it("Obtener status code 201 al agregar nuevo tipo de café", async () => {
        const cafe = { id: 100, nombre: "espresso" };
        const res = await request(server).post("/cafes").send(cafe);

        const status = res.statusCode;
        const cafes = res.body

        expect(cafes).toContainEqual(cafe);
        expect(status).toBe(201);
    })

    it('Obtener status code 400 actualizando tipo de café con ID erróneo', async () => {
        const id = "4";
        const cafe = { id: 123456, nombre: "Capuccino" };
        const res = await request(server).put(`/cafes/${id}`).send(cafe);
        
        const status = res.statusCode;
        
        expect(status).toBe(400);
    })
});
