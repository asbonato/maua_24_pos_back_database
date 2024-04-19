create database hospital;
use hospital;

-- cria a tabela hospital
create table tb_medico (
	crm int primary key,
    nome varchar(200) not null
    );
    
    create table tb_paciente(
		cpf bigint primary key,
        nome varchar(200) not null,
        idade smallint not null
	);
    
    create table tb_consulta (
		crm int not null,
        cpf bigint not null,
        data_hora datetime not null,
        primary key (crm, cpf, data_hora),
        constraint fk_medico foreign key (crm) references tb_medico(crm),
        constraint fk_paciente foreign key(cpf) references tb_paciente(cpf)
	);
    
    insert into tb_medico (crm, nome) values (12345, 'Dr. José');
    
    insert into tb_paciente(cpf, nome, idade) values
    (998877, 'Maria', 22),
    (11111111, 'Antônio', 30);
    
    insert into tb_consulta (crm, cpf, data_hora) values
    (12345, 998877, '2010-10-12  13:53:00'),
    (12345, 998877, '2021-10-13 18:00:00'),
    (12345, 11111111, '2021-10-17 22:00:00');
    
    select * 
    from tb_medico;
    
    select *
    from tb_paciente;
    
    select *
    from tb_consulta;
    
    select m.nome as medico, 
               p.nome as paciente, 
			  c.data_hora
    from tb_medico m
    inner  join tb_consulta c on m.crm=c.crm
    inner join tb_paciente p on p.cpf=c.cpf
    where p.cpf = 998877;
    
    select m.nome as medico, 
               p.nome as paciente, 
			  c.data_hora
    from tb_medico m
    inner  join tb_consulta c on m.crm=c.crm
    inner join tb_paciente p on p.cpf=c.cpf
    order by p.nome desc;
    
	select m.crm,
               m.nome as medico, 
               p.cpf,
               p.nome as paciente, 
			  count(*)
    from tb_medico m
    inner  join tb_consulta c on m.crm=c.crm
    inner join tb_paciente p on p.cpf=c.cpf
    group by m.crm,
                    m.nome, 
                    p.cpf,
                    p.nome; 

    
    
    
    
    
    
    
    
    
    
    