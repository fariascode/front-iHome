import { Router } from 'express';
import { bedroomsController } from '../controllers/index.js';

const bedroomsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bedroom:
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
 *         - readings
 *         - actions
 *       properties:
 *         arduinoIp:
 *           type: string
 *           description: IP del Arduino
 *         type:
 *           type: string
 *           description: Tipo de dispositivo (Sensor o Actuador)
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
 *           description: Estado del dispositivo
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
 *       example:
 *         arduinoIp: "2.120.35.0"
 *         type: "Sensor"
 *         name: "Temperatura y Humedad"
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
 *         location: "Recámara 1"
 *         status: "Disponible"
 *         registeredDate: "2024-07-02T00:00:00.000Z"
 *         owner: "MongoBb"
 *         readings:
 *           - name: "Detección de Temperatura"
 *             value: 20.21
 *             measurementUnit: "˚C"
 *           - name: "Detección de Humedad"
 *             value: 60
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
 *             location: "Recámara 1"
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
 *             location: "Recámara 1"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de iluminación"
 *                 value: 0.5
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
 *             location: "Recámara 1"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "90"
 *                 unit: "°"
 *         Actuator_Ventana_Derecha:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana_Derecha"
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
 *             location: "Recámara 1"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "Abierta"
 *         Actuator_Ventana_Izquierda:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana_Izquierda"
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
 *             location: "Recámara 1"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
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
 *             location: "Recámara 1"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
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
 *             location: "Recámara 1"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación eléctrica"
 *                 value: "Encendido"
 *         Fan_Actuator:
 *           value:
 *             arduinoIp: "192.168.1.9"
 *             type: "Actuador"
 *             name: "Ventilador"
 *             brand: "SY"
 *             model: "DC BRUSHLESS FAN"
 *             specifications:
 *               - name: "Tamaño"
 *                 value: 30.0
 *                 unit: "mm"
 *               - name: "Peso"
 *                 value: 9.0
 *                 unit: "g"
 *               - name: "Sonido"
 *                 value: 25.0
 *                 unit: "dB"
 *               - name: "Velocidad de operación"
 *                 value: 8000.0
 *                 unit: "rpm"
 *               - name: "Desplazamiento de aire"
 *                 value: 3.3
 *                 unit: "cfm"
 *               - name: "Voltage de operación"
 *                 value: 5.0
 *                 unit: "V"
 *               - name: "Corriente de operación"
 *                 value: 0.13
 *                 unit: "A"
 *                 type: "VCD"
 *               - name: "Consumo eléctrico"
 *                 value: 1.56
 *                 unit: "W"
 *             location: "Recámara 1"
 *             status: "Encendido"
 *             owner: ""
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "50"
 *                 measurementUnit: "%"
 */

/**
 * @swagger
 * /api/v1/bedrooms:
 *   post:
 *     summary: Crear un nuevo registro de dormitorio
 *     tags: [Bedrooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bedroom'
 *           examples:
 *             Temperature_Sensor:
 *               $ref: '#/components/schemas/Bedroom/examples/Temperature_Sensor'
 *             Fotoresistor_Sensor:
 *               $ref: '#/components/schemas/Bedroom/examples/Fotoresistor_Sensor'
 *             Puerta_Actuator:
 *               $ref: '#/components/schemas/Bedroom/examples/Actuator_Door'
 *             Actuator_Ventana_Derecha:
 *              $ref: '#/components/schemas/Bedroom/examples/Actuator_Ventana_Derecha'
 *             Actuator_Ventana_Izquierda:
 *              $ref: '#/components/schemas/Bedroom/examples/Actuator_Ventana_Izquierda'
 *             Luz_exterior_Actuator:
 *              $ref: '#/components/schemas/Bedroom/examples/Luz_exterior_Actuator'
 *             Rele_Actuator:
 *              $ref: '#/components/schemas/Bedroom/examples/Rele_Actuator'
 *             Fan_Actuator:
 *              $ref: '#/components/schemas/Bedroom/examples/Fan_Actuator'
 *     responses:
 *       200:
 *         description: El registro de dormitorio fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bedroom'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/v1/bedrooms:
 *   get:
 *     summary: Obtiene todos los registros de dispositivos de los cuartos
 *     tags: [Bedrooms]
 *     responses:
 *       200:
 *         description: Lista de dispositivos de los cuartos
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
 * /api/v1/bedrooms/{id}:
 *   delete:
 *     summary: Elimina un registro de dormitorio por ID
 *     tags: [Bedrooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dormitorio a eliminar
 *     responses:
 *       200:
 *         description: Dormitorio eliminado exitosamente
 *       404:
 *         description: Dormitorio no encontrado
 *       500:
 *         description: Error en el servidor
 */

bedroomsRouter.get('/', bedroomsController.getAllBedroomsData);
bedroomsRouter.get('/last/', bedroomsController.getLastRecords);
bedroomsRouter.get('/sensor/', bedroomsController.getSensorRecords);
bedroomsRouter.get('/actuator/', bedroomsController.getActuatorRecords);
bedroomsRouter.get('/sensor/chart/', bedroomsController.getSensorChartData);
bedroomsRouter.post('/', bedroomsController.createBedroomData);
bedroomsRouter.delete('/:id', bedroomsController.deleteBedroomRecordById);

export default bedroomsRouter;