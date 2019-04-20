import datetime
import decimal
import json

from sqlalchemy import create_engine


class InstructorDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateInstructor(self, name, surname, email, password_hash):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO instructor(name, surname, email, password_hash) VALUES('{name}', '{surname}', '{email}', '{password_hash}')"
                               .format(name=name, surname=surname, email=email, password_hash=password_hash))

    def SelectInstructorByCredentials(self, email, password_hash):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM instructor WHERE email = '{email}' AND password_hash = '{password_hash}'".format(email=email, password_hash=password_hash))
        connection.close()
        return json.dumps([dict(r) for r in result][0])


class StudentDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateStudent(self, name, surname, email, password_hash):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO instructor(name, surname, email, password_hash) VALUES('{name}', '{surname}', '{email}', '{password_hash}')"
                                .format(name=name, surname=surname, email=email, password_hash=password_hash))

    def SelectStudentByCredentials(self, email, password_hash):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM student WHERE email = {email} AND password_hash = {password_hash}".format(email=email, password_hash=password_hash))
        connection.close()
        return json.dumps([dict(r) for r in result][0])


class ProjectDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateProject(self, title, description, deadline, max_price, min_price, s_id, t_id):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO project (title, description, deadline, max_price, min_price, s_id, t_id) VALUES ('{title}', '{description}', '{deadline}', '{max_price}', '{min_price}', '{s_id}', '{t_id}')"
                               .format(title=title, description=description, deadline=deadline, max_price=max_price, min_price=min_price, s_id=s_id, t_id=t_id))

    def SelectAllProjects(self):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project")
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectProposalsByProjectId(self, p_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM proposal NATURAL JOIN instructor WHERE p_id = '{p_id}'".format(p_id=p_id))
        connection.close()
        print json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectProjectByProjectId(self, p_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project WHERE id = '{p_id}'".format(p_id=p_id))
        connection.close()
        return json.dumps([dict(r) for r in result][0], cls=CustomJsonEncoder)

class ProposalDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateProposal(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO proposal (comment, price, p_id, i_id) VALUES ({values})"
                               .format(values=','.join(values)))

    def SelectProposalsByProjectId(self, id):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM proposal WHERE p_id = {id}".format(id=id))
        connection.close()
        return json.dumps([(dict(row.items())) for row in result])


class ContractDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateContract(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO project (title, description, deadline, max_price, min_price, s_id) VALUES ({values})"
                               .format(values=','.join(values)))


class RateDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateRate(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO rate (score, comment, date, c_id, s_id) VALUES ({values})"
                               .format(values=','.join(values)))


class TagDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateRate(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO tag (name) VALUES ({values})"
                               .format(values=','.join(values)))


class DbContext:
    engine = create_engine('postgres://postgres:ekrembaba1@localhost:5432/freelancer')

    def __init__(self):
        self.Instructors = InstructorDbContext(self.engine)
        self.Students = StudentDbContext(self.engine)
        self.Projects = ProjectDbContext(self.engine)
        self.Proposals = ProposalDbContext(self.engine)
        self.Proposals = ContractDbContext(self.engine)
        self.Proposals = ProposalDbContext(self.engine)

    def Execute(self, query):
        connection = self.engine.connect()
        result = connection.execute(query)
        connection.close()
        return result

    def ExecuteWithRollback(self, table, columns, values):
        connection = self.engine.connect()
        print "INSERT INTO {table} ({columns}) VALUES ({values})".format(table=table, columns=', '.join(columns), values=','.join(values))
        with connection.begin() as trans:
            connection.execute("INSERT INTO {table} ({columns}) VALUES ({values})"
                               .format(table=table, columns=', '.join(columns), values=','.join(values)))


class CustomJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        if isinstance(obj, datetime.date):
            return obj.__str__()
        return super(CustomJsonEncoder, self).default(obj)
