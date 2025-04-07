// routes/bathrooms.routes.js

import { Router } from "express";
import { bathroomsController } from "../controllers/index.js";
import { authenticateToken } from '../controllers/authController.js';

const bathroomsRouter = Router();

// Ruta para crear datos de baño
/**
 * @swagger
 * components:
 *   schemas:
 *     Bathroom:
 *       type: object
 *       required:
 *         - arduinoIp
 *         - type
 *         - name
 *         - brand
 *         - model
 *         - specifications
 *         - location
 *         - status
 *         - owner
 *         - actions
 *       properties:
 *         arduinoIp:
 *           type: string
 *           description: IP del Arduino del baño
 *         type:
 *           type: string
 *           description: Tipo de dispositivo (Sensor, Actuador)
 *         name:
 *           type: string
 *           description: Nombre del dispositivo
 *         brand:
 *           type: string
 *           description: Marca del dispositivo
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         specifications:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la especificación
 *               minValue:
 *                 type: number
 *                 description: Valor mínimo (si aplica)
 *               maxValue:
 *                 type: number
 *                 description: Valor máximo (si aplica)
 *               value:
 *                 type: number
 *                 description: Valor de la especificación (si aplica)
 *               unit:
 *                 type: string
 *                 description: Unidad de medida
 *               type:
 *                 type: string
 *                 description: Tipo de corriente (si aplica)
 *         location:
 *           type: string
 *           description: Ubicación del dispositivo
 *         status:
 *           type: string
 *           description: Estado actual del dispositivo
 *         registeredDate:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro del dispositivo
 *         owner:
 *           type: string
 *           description: Propietario del dispositivo
 *         readings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la lectura
 *               value:
 *                 type: number
 *                 description: Valor de la lectura
 *               measurementUnit:
 *                 type: string
 *                 description: Unidad de medida de la lectura
 *           description: Lecturas del dispositivo
 *         actions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la acción
 *               value:
 *                 type: string
 *                 description: Valor de la acción
 *               unit:
 *                 type: string
 *                 description: Unidad de medida de la acción
 *           description: Acciones del dispositivo
 *       example:
 *         arduinoIp: "192.168.1.1"
 *         type: "Sensor"
 *         name: "Sensor de temperatura y humedad"
 *         brand: "Genérico"
 *         model: "DHT11"
 *         specifications:
 *           - name: "Rango de medición de temperatura"
 *             minValue: 0
 *             maxValue: 50
 *             unit: "°C"
 *           - name: "Rango de medición de humedad"
 *             minValue: 20
 *             maxValue: 90
 *             unit: "%"
 *           - name: "Voltage de operación"
 *             value: 5.5
 *             unit: "V"
 *           - name: "Corriente de operación"
 *             value: 2.5
 *             unit: "mA"
 *             type: "VCD"
 *           - name: "Consumo eléctrico"
 *             value: 0.00125
 *             unit: "W"
 *         location: "Baño 1"
 *         status: "Operativo"
 *         owner: "iHome"
 *         readings:
 *           - name: "Temperatura"
 *             value: 25.5
 *             measurementUnit: "°C"
 *           - name: "Humedad"
 *             value: 55
 *             measurementUnit: "%"
 *         actions: []
 *       examples:
 *         Temperature_Sensor:
 *           value:
 *             arduinoIp: "192.168.1.1"
 *             type: "Sensor"
 *             name: "Sensor de temperatura y humedad"
 *             brand: "Genérico"
 *             model: "DHT11"
 *             specifications:
 *               - name: "Rango de medición de temperatura"
 *                 minValue: 0
 *                 maxValue: 50
 *                 unit: "°C"
 *               - name: "Rango de medición de humedad"
 *                 minValue: 20
 *                 maxValue: 90
 *                 unit: "%"
 *               - name: "Voltage de operación"
 *                 value: 5.5
 *                 unit: "V"
 *               - name: "Corriente de operación"
 *                 value: 2.5
 *                 unit: "mA"
 *                 type: "VCD"
 *               - name: "Consumo eléctrico"
 *                 value: 0.00125
 *                 unit: "W"
 *             location: "Baño 1"
 *             status: "Operativo"
 *             owner: "iHome"
 *             readings:
 *               - name: "Temperatura"
 *                 value: 25.5
 *                 measurementUnit: "°C"
 *               - name: "Humedad"
 *                 value: 55
 *                 measurementUnit: "%"
 *             actions: []
 *         Fotoresistor_Sensor:
 *           value:
 *             arduinoIp: "192.168.1.5"
 *             type: "Sensor"
 *             name: "Fotorresistencia"
 *             brand: "Genérico"
 *             model: "LDR"
 *             specifications:
 *               - name: "Rango espectral"
 *                 minValue: 400.0
 *                 maxValue: 700.0
 *                 unit: "nm"
 *               - name: "Rango de respuesta"
 *                 minValue: 0
 *                 maxValue: 1024
 *               - name: "Voltage de operación"
 *                 value: 5.0
 *                 unit: "V"
 *               - name: "Corriente de operación"
 *                 value: 0.45
 *                 unit: "mA"
 *                 type: "VCD"
 *               - name: "Consumo de operación"
 *                 value: 1.56
 *                 unit: "W"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de iluminación"
 *                 value: 0.5
 *         Presence_Sensor:
 *           value:
 *             arduinoIp: "192.168.1.6"
 *             type: "Sensor"
 *             name: "Presencia"
 *             brand: "Rantec"
 *             model: "HC-SR501"
 *             specifications:
 *               - name: "Rango de distancia"
 *                 minValue: 10
 *                 maxValue: 50
 *                 measurementUnit: "cm"
 *               - name: "Alimentacion de Energía"
 *                 minValue: 5
 *                 maxValue: 12
 *                 measurementUnit: "V"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de presencia"
 *                 value: 0
 *         Proximity_Sensor:
 *           value:
 *             arduinoIp: "192.168.1.7"
 *             type: "Sensor"
 *             name: "Proximidad"
 *             brand: "AEDIKO"
 *             model: "HC-SR04"
 *             specifications:
 *               - name: "Rango de distancia"
 *                 maxValue: 400
 *                 minValue: 2
 *                 measurementUnit: "cm"
 *                 acurracy: "+-0.3"
 *               - name: "Alimentacion de Energía"
 *                 maxValue: 5
 *                 minValue: 3.3
 *                 measurementUnit: "V"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de distancia"
 *                 value: 0
 *         Actuator_Door:
 *           value:
 *             arduinoIp: "192.168.1.2"
 *             type: "Actuador"
 *             name: "Puerta"
 *             brand: "TowerPro"
 *             model: "SG90"
 *             specifications:
 *               - name: "Velocidad de operación"
 *                 value: 0.12
 *                 unit: "segundos/60°"
 *               - name: "Torque"
 *                 value: 2.5
 *                 unit: "kg-cm"
 *               - name: "Voltage de operación"
 *                 value: 5.0
 *                 unit: "V"
 *               - name: "Corriente de operación"
 *                 value: 10.0
 *                 unit: "mA"
 *                 type: "VCD"
 *               - name: "Consumo eléctrico"
 *                 value: 0.5
 *                 unit: "W"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "90"
 *                 unit: "°"
 *         Actuator_Ventana:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana"
 *             brand: "TowerPro"
 *             model: "SG90"
 *             specifications:
 *               - name: "Velocidad de operación"
 *                 value: 0.12
 *                 unit: "segundos/60°"
 *               - name: "Torque"
 *                 value: 2.5
 *                 unit: "kg-cm"
 *               - name: "Voltage de operación"
 *                 value: 5.0
 *                 unit: "V"
 *               - name: "Corriente de operación"
 *                 value: 10.0
 *                 unit: "mA"
 *                 type: "VCD"
 *               - name: "Consumo eléctrico"
 *                 value: 0.5
 *                 unit: "W"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "Abierta"
 *         Luz_exterior_Actuator:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Led Exterior"
 *             brand: "Genérico"
 *             model: "Diodo LED"
 *             specifications:
 *               - name: "Voltage de operación"
 *                 value: 3.3
 *                 unit: "V"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación eléctrica"
 *                 value: "Encendido"
 *         Bomba_Actuator:
 *           value:
 *             arduinoIp: "192.168.1.4"
 *             type: "Actuador"
 *             name: "Bomba de Agua"
 *             brand: "MV Electronica"
 *             model: "MOT-300"
 *             specifications:
 *               - name: "Alimentacion de Energía"
 *                 minValue: 3
 *                 maxValue: 6
 *                 measurementUnits: "V"
 *               - name: "Flujo Máximo"
 *                 minValue: 80
 *                 maxValue: 120
 *                 measurementUnits: "l/h"
 *               - name: "Altura Máxima de Elevación"
 *                 minValue: 80
 *                 maxValue: 100
 *                 measurementUnits: "cm"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación eléctrica"
 *                 value: "Encendido"
 *         Rele_Actuator:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Releay"
 *             brand: "Genérico"
 *             model: "JQC-3FF-S-Z"
 *             specifications:
 *               - name: "Voltage de operación"
 *                 value: 3.3
 *                 unit: "V"
 *             location: "Baño 1"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación eléctrica"
 *                 value: "Encendido"
 */

/**
 * @swagger
 * /api/v1/bathrooms:
 *   post:
 *     summary: Crea un nuevo registro de dispositivos en el baño (Sensor o Actuador)
 *     tags: [Bathrooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bathroom'
 *           examples:
 *             Temperature_Sensor:
 *               $ref: '#/components/schemas/Bathroom/examples/Temperature_Sensor'
 *             Fotoresistor_Sensor:
 *               $ref: '#/components/schemas/Bathroom/examples/Fotoresistor_Sensor'
 *             Presence_Sensor:
 *               $ref: '#/components/schemas/Bathroom/examples/Presence_Sensor'
 *             Proximity_Sensor:
 *               $ref: '#/components/schemas/Bathroom/examples/Proximity_Sensor'
 *             Puerta_Actuator:
 *               $ref: '#/components/schemas/Bathroom/examples/Actuator_Door'
 *             Ventana_Actuator:
 *              $ref: '#/components/schemas/Bathroom/examples/Actuator_Ventana'
 *             Luz_exterior_Actuator:
 *              $ref: '#/components/schemas/Bathroom/examples/Luz_exterior_Actuator'
 *             Bomba_Actuator:
 *              $ref: '#/components/schemas/Bathroom/examples/Bomba_Actuator'
 *             Rele_Actuator:
 *              $ref: '#/components/schemas/Bathroom/examples/Rele_Actuator'
 *     responses:
 *       200:
 *         description: El registro del dispositivo fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bathroom'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/v1/bathrooms:
 *   get:
 *     summary: Obtiene todos los registros de dispositivos de los baños
 *     tags: [Bathrooms]
 *     responses:
 *       200:
 *         description: Lista de dispositivos de los baños
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/v1/bathrooms/last?location=/{location}:
 *   get:
 *     summary: Obtiene todos los registros de dispositivos de los baños
 *     tags: [Bathrooms]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: ubicación del dispositivo de baño a consultar
 *     responses:
 *       200:
 *         description: Lista del ultimo registro de temperatura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/v1/bathrooms/{id}:
 *   delete:
 *     summary: Elimina un registro de dispositivo de baño por ID
 *     tags: [Bathrooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo de baño a eliminar
 *     responses:
 *       200:
 *         description: Dispositivo de baño eliminado exitosamente
 *       404:
 *         description: Dispositivo de baño no encontrado
 *       500:
 *         description: Error en el servidor
 */
bathroomsRouter.get("/", authenticateToken, bathroomsController.getAllBathroomsData);
bathroomsRouter.get("/last/",  bathroomsController.getLastRecords);
bathroomsRouter.get("/sensor/", authenticateToken, bathroomsController.getSensorRecords);
bathroomsRouter.get("/actuator/", authenticateToken, bathroomsController.getActuatorRecords);
bathroomsRouter.post("/", bathroomsController.createBathroomData);
bathroomsRouter.delete('/:id', authenticateToken, bathroomsController.deleteBathroomRecordById);

export default bathroomsRouter;
