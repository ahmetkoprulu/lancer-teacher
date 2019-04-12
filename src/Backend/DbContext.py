import json

from sqlalchemy import create_engine


class InstructorDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateInstructor(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute('INSERT INTO instructor (name, surname, email, password_hash) VALUES ({values})'
                               .format(values=','.join(values)))

    def SelectInstructorByCredentials(self, email, password_hash):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM instructor WHERE email = '{email}' AND password_hash = '{password_hash}'".format(email=email, password_hash=password_hash))
        connection.close()
        return json.dumps([dict(r) for r in result][0])


class StudentDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateStudent(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO student (name, surname, email, password_hash) VALUES ({values})"
                               .format(values=','.join(values)))

    def SelectStudentByCredentials(self, email, password_hash):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM student WHERE email = {email} AND password_hash = {password_hash}".format(email=email, password_hash=password_hash))
        connection.close()
        return json.dumps([dict(r) for r in result][0])


class ProjectDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateProject(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO project (title, description, deadline, max_price, min_price, s_id, t_id) VALUES ({values})"
                               .format(values=','.join(values)))

    def SelectProjectsByStudentId(self, s_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project WHERE s_id = '{s_id}'".format(s_id=s_id))
        connection.close()
        return json.dumps([dict(r) for r in result][0])


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


