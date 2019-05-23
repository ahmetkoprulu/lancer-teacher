import datetime
import decimal
import json

from sqlalchemy import create_engine


class InstructorDbContext:
    def __init__(self, engine):
        self.engine = engine

    def SelectInstructorById(self, id):
        connection = self.engine.connect()
        result = connection.execute(
            "SELECT * FROM instructor WHERE id = {id}".format(id=id))
        connection.close()
        return json.dumps([dict(r) for r in result][0])

    def CreateInstructor(self, name, surname, email, password_hash):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO instructor(name, surname, email, password_hash) VALUES('{name}', '{surname}', '{email}', '{password_hash}')"
                               .format(name=name, surname=surname, email=email, password_hash=password_hash))

    def SelectInstructorByCredentials(self, email, password_hash):
        connection = self.engine.connect()
        result = connection.execute(
            "SELECT * FROM instructor WHERE email = '{email}' AND password_hash = '{password_hash}'".format(email=email, password_hash=password_hash))
        connection.close()
        jsondict = [dict(r) for r in result][0]
        jsondict['role'] = 'instructor'
        return json.dumps(jsondict)
    
    def UpdateInstructionById(self, id, name, surname, email, password_hash):
        connection = self.engine.connect()
        connection.execute("UPDATE instructor SET name='{name}', surname='{surname}', password_hash='{password_hash}', email='{email}' WHERE id = {id}"
                            .format(id=id, name=name, surname=surname, password_hash=password_hash, email=email))
        connection.close()


class StudentDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateStudent(self, name, surname, email, password_hash):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO student(name, surname, email, password_hash) VALUES('{name}', '{surname}', '{email}', '{password_hash}')"
                               .format(name=name, surname=surname, email=email, password_hash=password_hash))

    def SelectStudentByCredentials(self, email, password_hash):
        connection = self.engine.connect()
        result = connection.execute(
            "SELECT * FROM student WHERE email = '{email}' AND password_hash = '{password_hash}'".format(email=email, password_hash=password_hash))
        connection.close()
        jsondict = [dict(r) for r in result][0]
        jsondict['role'] = 'student'
        return json.dumps(jsondict)
    
    def UpdateStudentById(self, id, name, surname, email, password_hash):
        connection = self.engine.connect()
        connection.execute("UPDATE student SET name='{name}', surname='{surname}', password_hash='{password_hash}', email='{email}' WHERE id = {id}"
                            .format(id=id, name=name, surname=surname, password_hash=password_hash, email=email))
        connection.close()


class ProjectDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateProject(self, title, description, deadline, max_price, min_price, s_id, t_id):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO project (title, description, deadline, max_price, min_price, s_id, t_id) VALUES ('{title}', '{description}', '{deadline}', {max_price}, {min_price}, {s_id}, '{t_id}')"
                               .format(title=title, description=description, deadline=deadline, max_price=max_price, min_price=min_price, s_id=s_id, t_id=t_id))

    def SelectAllProjects(self):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project")
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectPasiveProjectsByStudentId(self, s_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT instructor.name, instructor.surname, project.id, title, deadline, t_id, proposal.id AS p_id, price, contract.id AS c_id, contract.date, rate.score, rate.comment FROM project, proposal, instructor, contract LEFT JOIN rate ON rate.c_id = contract.id WHERE s_id = {s_id} AND p_id = project.id AND proposal.i_id = instructor.id AND contract.project_id = project.id AND contract.proposal_id = proposal.id;"
                                    .format(s_id=s_id))
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectActiveProjectsByStudentId(self, s_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project WHERE s_id = {s_id} AND id NOT IN (SELECT project_id FROM contract)"
                                    .format(s_id=s_id))
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectProjectsByInstructorId(self, i_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT student.name, student.surname, project.id, title, deadline, t_id, proposal.id AS p_id, price, contract.id AS c_id, contract.date, rate.score, rate.comment FROM proposal,student, project, contract LEFT JOIN rate ON rate.c_id = contract.id WHERE i_id = {i_id} AND p_id = project.id AND project.s_id = student.id AND contract.project_id = project.id AND contract.proposal_id = proposal.id;"
                                    .format(i_id=i_id))
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectActiveProjects(self):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project WHERE id NOT IN (SELECT project_id FROM contract)")
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectActiveProjectsByTagId(self):
        connection = self.engine.connect()
        result = connection.execute("SELECT * FROM project WHERE t_id='{t_id}' id NOT IN (SELECT project_id FROM contract)")
        connection.close()
        return json.dumps([dict(r) for r in result], cls=CustomJsonEncoder)

    def SelectProjectByProjectId(self, p_id):
        connection = self.engine.connect()
        result = connection.execute(
            "SELECT * FROM project WHERE id = '{p_id}'".format(p_id=p_id))
        connection.close()
        return json.dumps([dict(r) for r in result][0], cls=CustomJsonEncoder)
    
    def UpdateProjectById(self, id, title, description, deadline, min_price, max_price, t_id):
        connection = self.engine.connect()
        connection.execute("UPDATE project SET title='{title}', description='{description}', t_id='{t_id}', deadline='{deadline}', min_price={min_price}, max_price={max_price} WHERE id = {id}"
                            .format(id=id, title=title, description=description, deadline=deadline, min_price=min_price, max_price=max_price, t_id=t_id))
        connection.close()

    def DeleteProjectById(self, id):
        connection = self.engine.connect()
        connection.execute("DELETE FROM project WHERE id = {id}"
                            .format(id=id))
        connection.close()


class ProposalDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateProposal(self, comment, price, date, p_id, i_id):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO proposal (comment, price, date, p_id, i_id)  VALUES('{comment}', {price}, '{date}', {p_id}, {i_id})"
                               .format(comment=comment, price=price, date=date, p_id=p_id, i_id=i_id))

    def SelectProposalsByProjectId(self, id):
        connection = self.engine.connect()
        result = connection.execute("SELECT proposal.id, name, surname, proposal.comment, proposal.price, proposal.date, proposal.i_id, proposal.p_id, (SELECT count(*) AS count FROM proposal AS p, contract AS c, rate AS r WHERE p.i_id = proposal.i_id AND c.project_id = p.p_id AND c.proposal_id = p.id AND r.c_id = c.id GROUP BY i_id), (SELECT avg(score) AS avg FROM proposal AS p, contract AS c, rate AS r WHERE p.i_id = proposal.i_id AND c.project_id = p.p_id AND c.proposal_id = p.id AND r.c_id = c.id GROUP BY i_id) FROM proposal, instructor AS i WHERE p_id = {id} AND proposal.i_id = i.id"
                                    .format(id=id))
        connection.close()
        return json.dumps([(dict(row.items())) for row in result], cls=CustomJsonEncoder)

    def SelectActiveProposalsByInstructorId(self, i_id):
        connection = self.engine.connect()
        result = connection.execute("SELECT proposal.id, comment, price, date, p_id, title, deadline FROM proposal, project WHERE i_id = {i_id} AND p_id = project.id AND proposal.id NOT IN (SELECT proposal_id FROM contract)"
                                    .format(i_id=i_id))
        connection.close()
        return json.dumps([(dict(row.items())) for row in result], cls=CustomJsonEncoder)
    
    def UpdateProposalById(self, id, comment, price):
        connection = self.engine.connect()
        connection.execute("UPDATE proposal SET comment='{comment}', price={price} WHERE id = {id}"
                            .format(id=id, comment=comment, price=price))
        connection.close()

    def DeleteProposalById(self, id):
        connection = self.engine.connect()
        connection.execute("DELETE FROM proposal WHERE id = {id}".format(id=id))
        connection.close()


class ContractDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateContract(self, date, project_id, proposal_id):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO contract (date, project_id, proposal_id) VALUES ('{date}', {project_id}, {proposal_id})"
                               .format(date=date, project_id=project_id, proposal_id=proposal_id))


class RateDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateRate(self, c_id, score, comment):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO rate (c_id, score, comment) VALUES ({c_id}, {score}, '{comment}')"
                               .format(c_id=c_id, score=score, comment=comment))
    
    def UpdateRate(self, c_id, score, comment):
        connection = self.engine.connect()
        connection.execute("UPDATE rate SET score={score}, comment='{comment}' WHERE c_id = {c_id}"
                            .format(c_id=c_id, score=score, comment=comment))
        connection.close()


class TagDbContext:
    def __init__(self, engine):
        self.engine = engine

    def CreateRate(self, values):
        connection = self.engine.connect()
        with connection.begin() as trans:
            connection.execute("INSERT INTO tag (name) VALUES ({values})"
                               .format(values=','.join(values)))


class DbContext:
    engine = create_engine(
        'postgres://postgres:ekrembaba1@localhost:5432/freelancer')

    def __init__(self):
        self.Instructors = InstructorDbContext(self.engine)
        self.Students = StudentDbContext(self.engine)
        self.Projects = ProjectDbContext(self.engine)
        self.Proposals = ProposalDbContext(self.engine)
        self.Contracts = ContractDbContext(self.engine)
        self.Rates = RateDbContext(self.engine)

    def Execute(self, query):
        connection = self.engine.connect()
        result = connection.execute(query)
        connection.close()
        return result

    def ExecuteWithRollback(self, table, columns, values):
        connection = self.engine.connect()
        print "INSERT INTO {table} ({columns}) VALUES ({values})".format(
            table=table, columns=', '.join(columns), values=','.join(values))
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
