CREATE DATABASE IF NOT EXISTS fullcycle;
USE fullcycle;
create table if not exists people (id int not null auto_increment, name varchar(200) not null, primary key(id));
insert into people(name) values('Aluno na base de dados 1'), ('Aluno na base de dados 2');