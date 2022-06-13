create table movimientos (id_movimiento int(11) primary key auto_increment not null, descripcion enum('Salida','Llegada'));
insert into movimientos (descripcion) values ('Salida');
insert into movimientos (descripcion) values ('Llegada');