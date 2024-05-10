Documento Técnico: Sistema de Manejo de Asistencia de Empleados
Objetivo

## Documento Técnico: Sistema de Manejo de Asistencia de Empleados

### Objetivo
Desarrollar un sistema para gestionar y verificar la asistencia de empleados que trabajan en distintos centros de trabajo de acuerdo con una planificación mensual. Este sistema permitirá corroborar la asistencia diaria a través de llamadas telefónicas a los encargados de cada centro.

### Supuestos
1. Cada empleado está asignado a un centro de trabajo específico cada mes.
2. Los encargados de cada centro son responsables de verificar la asistencia diaria.
3. La empresa requiere reportes mensuales de asistencia por empleado y centro de trabajo.
4. Los empleados pueden ser reasignados a diferentes centros mensualmente.

### Consultas al Encargado del Proceso
1. ¿Existe actualmente un sistema para la planificación de las asignaciones de empleados a centros de trabajo?
2. ¿Cómo se realiza actualmente la verificación de asistencia y cuales son los problemas que se enfrenta con ese metodo?
3. ¿Cuál es la estructura organizativa de los centros de trabajo y quiénes son los encargados?
4. ¿Necesitan integración con otros sistemas (por ejemplo, nómina o recursos humanos)?
5. ¿Qué tipo de reportes y con qué frecuencia se requieren?

### Diseño de la Base de Datos
**Tablas Propuestas:**
1. **Empleado**
   - `CodigoEmpleado` (PK)
   - `Nombres`
   - `Apellidos`
   - `NúmeroTelefonico`
   - `Email`

2. **Centros de Trabajo**
   - `CodigoCentro` (PK)
   - `NombreCentro`
   - `Ubicacion`
   - `Telefono`
   - `CodigoEncargado` (FK a Empleados)

3. **Asignaciones**
   - `CodigoAsignacion` (PK)
   - `CodigoEmpleado` (FK a Empleados)
   - `CodigoCentro` (FK a Centros de Trabajo)
   - `FechaInicio`
   - `FechaFin`

4. **Asistencia**
   - `CodigoAsistencia` (PK)
   - `CodigoAsignacion` (FK a Asignaciones)
   - `Fecha`
   - `AsistenciaConfirmada` (Boolean)
   - `Comentarios`

### Procesos del Sistema
1. **Planificación de Asignaciones:**
   - Interface para asignar empleados a centros de trabajo mensualmente.
   - Posibilidad de modificar asignaciones en caso de necesidades operativas.

2. **Registro de Asistencia:**
   - Funcionalidad para que los encargados registren la asistencia diaria.
   - Formulario diario donde el encargado ingresa la asistencia basado en la lista de empleados asignados a su centro.
   - Opción para agregar comentarios sobre incidencias o particularidades del día.

3. **Verificación y Reportes:**
   - Sistema de reportes para verificar la asistencia por empleado, centro, y fecha.
   - Reportes exportables a formatos como PDF o Excel para análisis y archivo.

### Interfaces del Usuario
1. **Pantalla de Gestión de Asignaciones:**
   - Lista de empleados y centros con opción para crear y modificar asignaciones.
   - Calendario mensual para visualizar las asignaciones actuales y pasadas.

2. **Pantalla de Registro de Asistencia:**
   - Formulario diario para el encargado del centro para confirmar la asistencia.
   - Listado de empleados del día con checkbox para marcar asistencia.

3. **Pantalla de Reportes:**
   - Filtros por fecha, centro y empleado para generar reportes específicos.
   - Visualización y descarga de reportes.

### Tecnologías Sugeridas
- **Backend:** Node.js con Express para servicios API.
- **Frontend:** React para interfaces dinámicas y responsivas.
- **Base de Datos:** MySQL para manejo de datos relacionales.
- **Autenticación:** JWT para gestionar accesos y roles.

