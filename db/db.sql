create table planes (
  planes_id bigint primary key generated always as identity,
  planes_nombre text,
  planes_precio decimal,
  planes_descripcion text
);

create table tutores (
  tutores_id bigint primary key generated always as identity,
  tutores_nombre text,
  tutores_apellido_paterno text,
  tutores_apellido_materno text,
  tutores_correo text unique,
  tutores_contraseña text,
  tutores_fechareg timestamp with time zone default now()
);

create table usuarios (
  usuario_id bigint primary key generated always as identity,
  usuario_nombre text,
  usuario_apellido_paterno text,
  usuario_apellido_materno text,	
  usuario_correo text unique,
  usuario_contraseña text,
  usuario_fechareg timestamp with time zone default now(),
  planes_id bigint references planes (planes_id)
);

create table areas (
  areas_id bigint primary key generated always as identity,
  areas_nombre text,
  descripcion text
);

create table comentarios (
  comentarios_id bigint primary key generated always as identity,
  comentarios_texto text,
  usuario_id bigint references usuarios (usuario_id),
  tutores_id bigint references tutores (tutores_id),
  comentarios_likes integer,
  comentarios_fechareg timestamp with time zone default now()
);

create table asesorias (
  asesorias_id bigint primary key generated always as identity,
  asesorias_duracion integer,
  asesorias_fecha timestamp with time zone,
  asesorias_estado text,
  usuario_id bigint references usuarios (usuario_id),
  tutores_id bigint references tutores (tutores_id)
);

create table recursos (
  recursos_id bigint primary key generated always as identity,
  recursos_temas text,
  recursos_fecha timestamp with time zone default now(),
  recursos_descripcion text,
  tutores_id bigint references tutores (tutores_id),
  recursos_precio decimal
);

create table videos (
  videos_id bigint primary key generated always as identity,
  videos_temas text,
  videos_fecha timestamp with time zone default now(),
  videos_descripcion text,
  tutores_id bigint references tutores (tutores_id),
  videos_precio decimal,
  videos_url text
);

create table pedido (
  pedido_id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (usuario_id),
  pedido_fecha timestamp with time zone default now(),
  metodo_pago text,
  impuesto decimal,
  descuento decimal,
  pedido_total decimal,
  pedido_estado text
);

create table detalles_pedido (
  detalle_id bigint primary key generated always as identity,
  pedido_id bigint references pedido (pedido_id),
  planes_id bigint references planes (planes_id),
  recursos_id bigint references recursos (recursos_id),
  videos_id bigint references videos (videos_id),
  cantidad integer,
  precio_unitario decimal,
  total decimal
);

create table pagos (
  pagos_id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (usuario_id),
  pedido_id bigint references pedido (pedido_id),
  pagos_metodo text,
  pedido_total decimal,
  pagos_fecha timestamp with time zone default now(),
  pagos_estado text
);

create table tutores_areas (
  id bigint primary key generated always as identity,
  tutores_id bigint references tutores (tutores_id),
  areas_id bigint references areas (areas_id)
);

-- Crear tabla de relación para videos y áreas
create table videos_areas (
  id bigint primary key generated always as identity,
  videos_id bigint references videos (videos_id),
  areas_id bigint references areas (areas_id)
);

-- Crear tabla de relación para recursos y áreas
create table recursos_areas (
  id bigint primary key generated always as identity,
  recursos_id bigint references recursos (recursos_id),
  areas_id bigint references areas (areas_id)
);

-- Crear tabla de relación para asesorías y áreas
create table asesorias_areas (
  id bigint primary key generated always as identity,
  asesorias_id bigint references asesorias (asesorias_id),
  areas_id bigint references areas (areas_id)
);

create table likes (
  like_id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (usuario_id),
  comentarios_id bigint references comentarios (comentarios_id),
  fecha_like timestamp with time zone default now()
);

create table respuestas (
  respuesta_id bigint primary key generated always as identity,
  comentarios_id bigint references comentarios (comentarios_id),
  usuario_id bigint references usuarios (usuario_id),
  respuesta_texto text,
  respuesta_fecha timestamp with time zone default now()
);
--VALORES DE EJEMPLO--

-- Insertar datos en la tabla planes
insert into
  planes (planes_nombre, planes_precio, planes_descripcion)
values
  (
    'Plan Gratuito',
    0.00,
    'Acceso limitado a recursos y videos'
  ),
  (
    'Plan Basico',
    100.00,
    'Acceso completo a todos los recursos y videos'
  ),
  (
    'Plan Premium',
    200.00,
    'Acceso a 5 tutorias personalizadas por mes (disponibilidad del tutor)'
  );
  
-- Insertar datos en la tabla tutores
insert into
  tutores (
    tutores_nombre,
	tutores_apellido_paterno,
	tutores_apellido_materno,
    tutores_correo,
    tutores_contraseña
  )
values
  (
    'Antonio',
	'Juarez',
	'Posada',
    'an.onio@example.com',
    'password123'
  ),
  (
    'Jan',
	'Juarez',
	'Posada',
    'jan.lopez@example.com',
    'securepass'
  ),
  (
    'Mauricio',
	'Juarez',
	'Posada',
    'mariscos@example.com',
    'mypassword'
  );

-- Insertar datos en la tabla usuarios
insert into
  usuarios (
    usuario_nombre,
	usuario_apellido_paterno,
	usuario_apellido_materno,
    usuario_correo,
    usuario_contraseña,
    planes_id
  )
values
  (
    'Ruben',
	'Sos',
	'nse',
    'sos@example.com',
    'Rubenpass',
    1
  ),
  (
    'abdn',
	'rivera',
	'maya',
    'mayes@example.com',
    'abdnpass',
    2
  ),
  (
    'rodofo',
	'torres',
	'zepeda',
    '9/11@example.com',
    'rodopass',
    3
  );

-- Insertar datos en la tabla areas
insert into
  areas (areas_nombre, descripcion)
values
  (
    'Biotica',
    'Área de la biotica'
  ),
  (
    'Farmaciologia',
    'Área de medicinas y farmacos'
  ),
  ('Anatomia', 'Área anatomica nose');

-- Insertar datos en la tabla comentarios
insert into
  comentarios (
    comentarios_texto,
    usuario_id,
    tutores_id,
    comentarios_likes
  )
values
  (
    'Este artículo es muy interesante. 100% Recomendado, me ayudo a pasar mis examenes',
    1,
    null,
    10
  ),
  ('Me ayudó mucho con mis dudas.', 2, null, 5),
  ('muchas gracias', null, 2, 8);

-- Insertar datos en la tabla asesorias
insert into
  asesorias (
    asesorias_duracion,
    asesorias_fecha,
    asesorias_estado,
    usuario_id,
    tutores_id
  )
values
  (60, '2023-10-20 10:00:00+00', 'Completada', 1, 1),
  (45, '2023-11-12 11:00:00+00', 'Pendiente', 2, 2),
  (30, '2023-11-24 12:00:00+00', 'Cancelada', 3, 3);

-- Insertar datos en la tabla recursos
insert into
  recursos (
    recursos_temas,
    recursos_descripcion,
    tutores_id,
    recursos_precio
  )
values
  (
    'Anatomia Basica',
    'Recurso sobre Anatomia Basica',
    1,
    5.99
  ),
  (
    'Farmacologia Basica',
    'Introducción a la Farmacologia',
    2,
    7.99
  ),
  (
    'Biologia',
    'Recurso sobre Biologia avanzada',
    3,
    4.99
  );

-- Insertar datos en la tabla videos
insert into
  videos (
    videos_temas,
    videos_descripcion,
    tutores_id,
    videos_precio,
    videos_url
  )
values
  (
    'Anatomia para principiantes',
    'Video Anatomia de introduccion',
    1,
    3.99,
    'https://youtu.be/dQw4w9WgXcQ?si=XI9OC9Jr8GrrY6go'
  ),
  (
    'Biología Molecular',
    'Video sobre biología molecular',
    2,
    6.99,
    'https://youtu.be/dQw4w9WgXcQ?si=XI9OC9Jr8GrrY6go'
  ),
  (
    'Biologia',
    'Video sobre biologia',
    3,
    2.99,
    'https://youtu.be/dQw4w9WgXcQ?si=XI9OC9Jr8GrrY6go'
  );

-- Insertar datos en la tabla pedido
insert into
  pedido (
    usuario_id,
    metodo_pago,
    impuesto,
    descuento,
    pedido_total,
    pedido_estado
  )
values
  (
    1,
    'Tarjeta de Crédito',
    1.99,
    0.99,
    10.99,
    'Completado'
  ),
  (2, 'PayPal', 2.99, 1.49, 20.49, 'Pendiente'),
  (
    3,
    'Transferencia Bancaria',
    0.99,
    0.49,
    5.49,
    'Cancelado'
  );

-- Insertar datos en la tabla detalles_pedido
insert into
  detalles_pedido (
    pedido_id,
    planes_id,
    recursos_id,
    videos_id,
    cantidad,
    precio_unitario,
    total
  )
values
  (1, 1, 1, 1, 1, 9.99, 9.99),
  (2, 2, 2, 2, 1, 19.99, 19.99),
  (3, 3, 3, 3, 1, 4.99, 4.99);

-- Insertar datos en la tabla pagos
insert into
  pagos (
    usuario_id,
    pedido_id,
    pagos_metodo,
    pedido_total,
    pagos_estado
  )
values
  (1, 1, 'Tarjeta de Crédito', 10.99, 'Completado'),
  (2, 2, 'PayPal', 20.49, 'Pendiente'),
  (3, 3, 'Transferencia Bancaria', 5.49, 'Cancelado');
  
-- Insertar datos de ejemplo en tutores_areas
insert into
  tutores_areas (tutores_id, areas_id)
values
  (1, 1),
  (1, 2),
  (2, 2),
  (2, 3),
  (3, 1);

-- Insertar datos de ejemplo en videos_areas
insert into
  videos_areas (videos_id, areas_id)
values
  (1, 1),
  (1, 3),
  (2, 2),
  (3, 1),
  (3, 3);

-- Insertar datos de ejemplo en recursos_areas
insert into
  recursos_areas (recursos_id, areas_id)
values
  (1, 1),
  (2, 2),
  (2, 3),
  (3, 1);

-- Insertar datos de ejemplo en asesorias_areas
insert into
  asesorias_areas (asesorias_id, areas_id)
values
  (1, 1),
  (2, 2),
  (3, 3);

-- Insertar datos adicionales en tutores para reflejar múltiples áreas
insert into
  tutores_areas (tutores_id, areas_id)
values
  (3, 2),
  (3, 3);
  
-- Insertar datos de prueba en la tabla likes
insert into
  likes (usuario_id, comentarios_id)
values
  (1, 1),
  (2, 1),
  (3, 2),
  (1, 3),
  (2, 3);

-- Insertar datos de prueba en la tabla respuestas
insert into
  respuestas (comentarios_id, usuario_id, respuesta_texto)
values
  (1, 2, 'Estoy de acuerdo con tu comentario.'),
  (1, 3, 'Gracias por la información.'),
  (2, 1, '¿Podrías explicar más sobre este tema?'),
  (3, 2, 'Muy buen punto, lo tendré en cuenta.'),
  (3, 1, 'Interesante, gracias por compartir.');