1.	Diseño de la Base de Datos:
o	    Usuarios: Tabla para usuarios (id, nombre, apellido, username, email, contraseña, equipo_favorito).
o	    Partidos: Tabla para partidos de la liga (id, fecha, equipo_local, equipo_visitante, resultado_final).
o	    Pronósticos: Tabla para pronósticos de usuarios (id, id_usuario, id_partido, pronostico_local, pronostico_visitante,            resultado_ajustado).
o	    Puntos: Tabla para almacenar los puntos acumulados por los usuarios por partido (id_usuario, id_partido, puntos).
2.	Desarrollo del Backend:
o	    Autenticación:
	        Implementar registro e inicio de sesión de usuarios con email y contraseña. -- LISTO
	        Implementar encriptación de contraseñas usando bcrypt o argon2. -- LISTO.
o	Rutas del Backend:
	    Usuarios:
	        Crear, editar y eliminar usuarios.
	        Iniciar sesión (autenticación JWT).
	    Pronósticos:
	        Los usuarios deben poder enviar pronósticos para cada partido.
	        Los pronósticos se validan cuando el resultado final del partido está disponible.
	Partidos:
	        Los administradores pueden agregar partidos y resultados finales.
	        Los administradores pueden ver todos los pronósticos y puntuaciones.
3.	Cálculo de Puntos:
o	    Cada vez que se ingresen los resultados de los partidos, se calcularán los puntos de cada usuario según los criterios definidos:
	    3 puntos: Si el usuario predice el resultado exacto.
	    1 punto: Si acierta el pronóstico (por ejemplo, predice que el equipo local gana y el equipo local efectivamente gana, sin importar el marcador exacto).
	    0 puntos: Si el pronóstico es incorrecto.
4.	Control de acceso:
o	    Implementar middleware para verificar los permisos del usuario (admin o usuario común).
o	    Asegurarse de que los administradores tengan acceso a todas las funcionalidades y los usuarios comunes solo puedan gestionar sus pronósticos.
