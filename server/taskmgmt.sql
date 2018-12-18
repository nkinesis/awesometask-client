/*Awesome Task Manager
Use the code below to create tables and populate them with test data.
Tables: User, Task
*/
use taskmgmt;
create table user (id integer not null auto_increment, email varchar(255), username varchar(255), passwd varchar(255), creationDate datetime, primary key(id));
create table task (id integer not null auto_increment, description varchar(255), priority TINYINT, status TINYINT, dueDate date, id_user integer, primary key(id), FOREIGN KEY (id_user) REFERENCES user(id));
insert into user(username, passwd, creationDate) values ('root', 'root22', '2018-08-22');
insert into task(description, priority, dueDate, id_user) values ('Do work', 1, '2099-08-22', 1);
show tables;


