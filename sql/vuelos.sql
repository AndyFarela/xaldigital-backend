create table vuelos (id_vuelo int(11) primary key auto_increment not null, id_aerolinea int(11), id_aeropuerto int(11), id_movimiento int(11), dia datetime);
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (1,1,1, '2021-05-02');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (2,1,1, '2021-05-02');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (3,2,2, '2021-05-02');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (4,3,2, '2021-05-02');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (1,3,2, '2021-05-02');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (2,1,1, '2021-05-02');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (2,3,1, '2021-05-04');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (3,4,1, '2021-05-04');
insert into vuelos (id_aerolinea, id_aeropuerto, id_movimiento, dia) values (3,4,1, '2021-05-04');