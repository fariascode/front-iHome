import { Router } from "express";
import { kitchensController } from "../controllers/index.js";

const kitchenRouter = Router(); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Kitchen:
 *       type: object
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
 *               actionType:
 *                 type: string
 *                 description: Tipo de acción
 *               actionValue:
 *                 type: string
 *                 description: Valor de la acción
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
 *         location: "Cocina"
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
 *             location: "Cocina"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de iluminación"
 *                 value: 0.5
 *         Gas_Sensor:
 *           value:
 *             arduinoIp: "192.168.1.11"
 *             type: "Sensor"
 *             name: "Gas"
 *             brand: "Steren"
 *             model: "MQ2"
 *             specifications:
 *               - name: "Consumo"
 *                 minValue: 5
 *                 maxValue: 5
 *                 unit: "volts"
 *               - name: "Amoníaco"
 *                 minimum: 10
 *                 maximum: 300
 *                 units: "ppm"
 *             location: "Cocina"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Detección de Gas"
 *                 value: 0.0
 *                 measurementUnit: "ppm"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "90"
 *                 unit: "°"
 *         Actuator_Ventana_Derecha_I:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana_Derecha_I"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "Abierta"
 *         Actuator_Ventana_Izquierda_I:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana_Izquierda_I"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "Abierta"
 *         Actuator_Ventana_Derecha_D:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana_Derecha_D"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "Abierta"
 *         Actuator_Ventana_Izquierda_D:
 *           value:
 *             arduinoIp: "192.168.1.3"
 *             type: "Actuador"
 *             name: "Ventana_Izquierda_D"
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
 *             location: "Cocina"
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
 *             location: "Cocina"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             registeredDate: "2024-07-02T00:00:00.000Z"
 *             owner: "iHome"
 *             actions:
 *               - name: "Activación eléctrica"
 *                 value: "Encendido"
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
 *             location: "Cocina"
 *             status: "Disponible"
 *             owner: "iHome"
 *             readings:
 *               - name: "Alarma"
 *                 value: true
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
 *             location: "Cocina"
 *             status: "Encendido"
 *             owner: ""
 *             actions:
 *               - name: "Activación mecánica"
 *                 value: "50"
 *                 measurementUnit: "%"
 */

/**
 * @swagger
 * /api/v1/kitchens:
 *   post:
 *     summary: Crear un nuevo registro de cocina
 *     tags: [Kitchens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Kitchen'
 *           examples:
 *             Temperature_Sensor:
 *               $ref: '#/components/schemas/Kitchen/examples/Temperature_Sensor'
 *             Fotoresistor_Sensor:
 *               $ref: '#/components/schemas/Kitchen/examples/Fotoresistor_Sensor'
 *             Gas_Sensor:
 *               $ref: '#/components/schemas/Kitchen/examples/Gas_Sensor'
 *             Puerta_Actuator:
 *               $ref: '#/components/schemas/Kitchen/examples/Actuator_Door'
 *             Actuator_Ventana_Derecha_I:
 *              $ref: '#/components/schemas/Kitchen/examples/Actuator_Ventana_Derecha_I'
 *             Actuator_Ventana_Izquierda_I:
 *              $ref: '#/components/schemas/Kitchen/examples/Actuator_Ventana_Izquierda_I'
 *             Actuator_Ventana_Derecha_D:
 *              $ref: '#/components/schemas/Kitchen/examples/Actuator_Ventana_Derecha_D'
 *             Actuator_Ventana_Izquierda_D:
 *              $ref: '#/components/schemas/Kitchen/examples/Actuator_Ventana_Izquierda_D'
 *             Luz_exterior_Actuator:
 *              $ref: '#/components/schemas/Kitchen/examples/Luz_exterior_Actuator'
 *             Rele_Actuator:
 *              $ref: '#/components/schemas/Kitchen/examples/Rele_Actuator'
 *             Alarma_Actuator:
 *              $ref: '#/components/schemas/Kitchen/examples/Actuator_Alarma'
 *             Fan_Actuator:
 *              $ref: '#/components/schemas/Kitchen/examples/Fan_Actuator'
 *     responses:
 *       200:
 *         description: El registro de dormitorio fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kitchen'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/v1/kitchens:
 *   get:
 *     summary: Obtiene todos los registros de dispositivos de la cocina
 *     tags: [Kitchens]
 *     responses:
 *       200:
 *         description: Lista de dispositivos de la cocina
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
 * /api/v1/kitchens/{id}:
 *   delete:
 *     summary: Elimina un registro de cocina por ID
 *     tags: [Kitchens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro de cocina a eliminar
 *     responses:
 *       200:
 *         description: Registro de cocina eliminado exitosamente
 *       404:
 *         description: Registro de cocina no encontrado
 *       500:
 *         description: Error en el servidor
 */

kitchenRouter.get('/', kitchensController.getAllkitchensData);
kitchenRouter.get('/last/', kitchensController.getLastRecords);
kitchenRouter.get('/sensor/', kitchensController.getSensorRecords);
kitchenRouter.get('/actuator/', kitchensController.getActuatorRecords);
kitchenRouter.post('/', kitchensController.createkitchenData);
kitchenRouter.delete('/:id', kitchensController.deleteKitchenById);

export default kitchenRouter;
