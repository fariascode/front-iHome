import { Router } from "express"
import { garageController } from "../controllers/index.js"

3
const garageRouter = Router(); 

// Ruta para crear datos de garaje
/**
 * @swagger
 * components:
 *   schemas:
 *     Garage:
 *       type: object
 *       properties:
 *         arduinoIp:
 *           type: string
 *           description: IP del Arduino del garaje
 *         type:
 *           type: string
 *           description: Tipo de dispositivo (Sensor, Actuador, etc.)
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
 *               description:
 *                 type: string
 *                 description: Descripción de la acción
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
 *         - readings
 *         - actions
 *       example:
 *         arduinoIp: "192.168.1.1"
 *         type: "Sensor"
 *         name: "Fotorresistencia"
 *         brand: "Genérico"
 *         model: "LDR"
 *         specifications:
 *           - name: "Rango espectral"
 *             minValue: 400
 *             maxValue: 700
 *             unit: "°C"
 *           - name: "Rango de respuesta"
 *             minValue: 0
 *             maxValue: 1024
 *             unit: "%"
 *           - name: "Voltage de operación"
 *             value: 5
 *             unit: "V"
 *           - name: "Corriente de operación"
 *             value: 0.56
 *             unit: "mA"
 *             type: "VCD"
 *           - name: "Consumo eléctrico"
 *             value: 1.56
 *             unit: "W"
 *         location: "Garaje"
 *         status: "Operativo"
 *         owner: "iHome"
 *         readings:
 *           - name: "Detección de Iluminación"
 *             value: 205
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
 *             location: "Garaje"
 *             status: "Operativo"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
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
 *             location: "Garaje"
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
 *             location: "Garaje"
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
 *             location: "Garaje"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de distancia"
 *                 value: 0
 *         Actuator_Alarma:
 *           value:
 *             arduinoIp: "192.168.1.4"
 *             type: "Actuador"
 *             name: "Alarma"
 *             brand: "Genérica"
 *             model: "BBZ-01"
 *             specifications:
 *               - name: "Nivel de sonido"
 *                 value: 90
 *                 unit: "dB"
 *               - name: "Voltage de operación"
 *                 value: 12
 *                 unit: "V"
 *             location: "Garaje"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Alarma"
 *                 value: true
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
 *             location: "Garaje"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "90"
 *                 unit: "°"
 *         Actuator_Porton_Izquierda:
 *           value:
 *             arduinoIp: "192.168.1.4"
 *             type: "Actuador"
 *             name: "Porton Izquierda"
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
 *             location: "Garaje"
 *             status: "Disponible"
 *             owner: ""
 *             readings: []
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "Abierta"
 *         Actuator_Porton_Derecha:
 *           value:
 *             arduinoIp: "192.168.1.4"
 *             type: "Actuador"
 *             name: "Porton Derecha"
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
 *             location: "Garaje"
 *             status: "Disponible"
 *             owner: ""
 *             readings: []
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
 *             location: "Garaje"
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
 *             location: "Garaje"
 *             status: "Disponible"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación eléctrica"
 *                 value: "Encendido"
 */

/**
 * @swagger
 * /api/v1/garages:
 *   post:
 *     summary: Crea un nuevo registro de datos de garaje
 *     tags: [Garage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Garage'
 *           examples:
 *             Temperature_Sensor:
 *               $ref: '#/components/schemas/Garage/examples/Temperature_Sensor'
 *             Fotoresistor_Sensor:
 *               $ref: '#/components/schemas/Garage/examples/Fotoresistor_Sensor'
 *             Presence_Sensor:
 *               $ref: '#/components/schemas/Garage/examples/Presence_Sensor'
 *             Proximity_Sensor:
 *               $ref: '#/components/schemas/Garage/examples/Proximity_Sensor'
 *             Alarma_Actuator:
 *               $ref: '#/components/schemas/Garage/examples/Actuator_Alarma'
 *             Puerta_Actuator:
 *               $ref: '#/components/schemas/Garage/examples/Actuator_Door'
 *             Actuator_Porton_Izquierda:
 *               $ref: '#/components/schemas/Garage/examples/Actuator_Porton_Izquierda'
 *             Actuator_Porton_Derecha:
 *               $ref: '#/components/schemas/Garage/examples/Actuator_Porton_Derecha'
 *             Luz_exterior_Actuator:
 *              $ref: '#/components/schemas/Garage/examples/Luz_exterior_Actuator'
 *             Rele_Actuator:
 *              $ref: '#/components/schemas/Garage/examples/Rele_Actuator'
 *     responses:
 *       200:
 *         description: El registro de dormitorio fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garage'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/v1/garages:
 *   get:
 *     summary: Obtiene todos los registros de dispositivos del garaje
 *     tags: [Garage]
 *     responses:
 *       200:
 *         description: Lista de dispositivos del garaje
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
 * /api/v1/garages/{id}:
 *   delete:
 *     summary: Elimina un registro de dispositivo del garaje por ID
 *     tags: [Garage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo del garaje a eliminar
 *     responses:
 *       200:
 *         description: Dispositivo del garaje eliminado exitosamente
 *       404:
 *         description: Dispositivo del garaje no encontrado
 *       500:
 *         description: Error en el servidor
 */

garageRouter.get('/', garageController.getAllgarageData);
garageRouter.get('/last/', garageController.getLastRecords);
garageRouter.get('/sensor/', garageController.getSensorRecords);
garageRouter.get('/actuator/', garageController.getActuatorRecords);
garageRouter.post('/', garageController.creategarageData);
garageRouter.delete('/:id', garageController.deleteGarageRecordById);

export default garageRouter