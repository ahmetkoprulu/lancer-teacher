-- Database: freelancer

-- DROP DATABASE freelancer;

CREATE DATABASE freelancer
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United Kingdom.1254'
    LC_CTYPE = 'English_United Kingdom.1254'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
	-- Table: public.instructor

-- DROP TABLE public.instructor;

CREATE TABLE public.instructor
(
    id bigint NOT NULL DEFAULT nextval('instructor_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(150) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT instructor_pkey PRIMARY KEY (id),
    CONSTRAINT instructor_email_key UNIQUE (email)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.instructor
    OWNER to postgres;
	
	-- Table: public.student

-- DROP TABLE public.student;

CREATE TABLE public.student
(
    id bigint NOT NULL DEFAULT nextval('student_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(150) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT student_pkey PRIMARY KEY (id),
    CONSTRAINT student_email_key UNIQUE (email)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.student
    OWNER to postgres;

-- Table: public.tag

-- DROP TABLE public.tag;

CREATE TABLE public.tag
(
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tag_pkey PRIMARY KEY (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tag
    OWNER to postgres;
	
-- Table: public.project

-- DROP TABLE public.project;

CREATE TABLE public.project
(
    id bigint NOT NULL DEFAULT nextval('project_id_seq'::regclass),
    title character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    deadline date NOT NULL,
    min_price numeric(7,0),
    max_price numeric(7,0) NOT NULL,
    s_id integer NOT NULL,
    t_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT project_pkey PRIMARY KEY (id),
    CONSTRAINT project_s_id_fkey FOREIGN KEY (s_id)
        REFERENCES public.student (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT project_t_id_fkey FOREIGN KEY (t_id)
        REFERENCES public.tag (name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.project
    OWNER to postgres;
	
-- Table: public.proposal

-- DROP TABLE public.proposal;

CREATE TABLE public.proposal
(
    id bigint NOT NULL DEFAULT nextval('proposal_id_seq'::regclass),
    comment character varying(300) COLLATE pg_catalog."default",
    price numeric(7,0) NOT NULL,
    p_id integer NOT NULL,
    i_id integer NOT NULL,
    CONSTRAINT proposal_pkey PRIMARY KEY (id),
    CONSTRAINT proposal_i_id_fkey FOREIGN KEY (i_id)
        REFERENCES public.instructor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT proposal_p_id_fkey FOREIGN KEY (p_id)
        REFERENCES public.project (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.proposal
    OWNER to postgres;
	
-- Table: public.contract

-- DROP TABLE public.contract;

CREATE TABLE public.contract
(
    id bigint NOT NULL DEFAULT nextval('contract_id_seq'::regclass),
    p_id integer NOT NULL,
    CONSTRAINT contract_pkey PRIMARY KEY (id),
    CONSTRAINT contract_p_id_fkey FOREIGN KEY (p_id)
        REFERENCES public.proposal (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.contract
    OWNER to postgres;

-- Table: public.rate

-- DROP TABLE public.rate;

CREATE TABLE public.rate
(
    id bigint NOT NULL DEFAULT nextval('rate_id_seq'::regclass),
    score numeric(1,0) NOT NULL,
    comment character varying(300) COLLATE pg_catalog."default",
    date date,
    c_id integer NOT NULL,
    s_id integer NOT NULL,
    CONSTRAINT rate_pkey PRIMARY KEY (id),
    CONSTRAINT rate_c_id_fkey FOREIGN KEY (c_id)
        REFERENCES public.contract (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rate_s_id_fkey FOREIGN KEY (s_id)
        REFERENCES public.student (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.rate
    OWNER to postgres;