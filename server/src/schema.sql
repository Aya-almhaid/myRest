

create table users(
userid  serial primary key,
created_at timestamp default current_timestamp,
name varchar(100) not null,
email varchar(100) unique not null,
hashed_password varchar(255) not null
);

ALTER TABLE users 
  ADD COLUMN role text[] DEFAULT ARRAY['employee'];

SELECT * FROM users;

ALTER TABLE users 
  ADD CONSTRAINT check_role 
  CHECK (role <@ ARRAY['users','employee','manager']::text[]);

INSERT INTO users (name, email, hashed_password) 
VALUES ('aya', 'aya@gmail.com', '123123');



--///////////////////////////////


create table  categories (
catId serial primary key ,
name varchar(50) not null,
description text 
)



select * from  categories 

alter table categories add column created_at timestamp default  current_timestamp

--///////////////////////////////////////
create table menue (
menue_id serial primary key,
name varchar(100) not null,
description text,
price money ,
quantity int ,
image text,
cat_id int ,
 foreign key (cat_id)  references categories(catId)
)

select *  from menue 
