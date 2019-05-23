from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from DbContext import DbContext
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)
db = DbContext()

@app.route('/')
def hello_world():
    return jsonify('sa'), 200

@app.route('/instructor/<int:id>')
def InstructorGetById(id):
    return db.Instructors.SelectInstructorById(id)

@app.route('/instructors', methods=['POST'])
def InstructorRegister():
    content = request.get_json(force=True)
    print content
    db.Instructors.CreateInstructor(content['name'], content['surname'], content['email'], content['password_hash'])
    return jsonify({'message': 'Succcess'})

@app.route('/instructors/login', methods=['POST'])
def InstructorLogin():
    content = request.get_json(force=True)
    instructor = db.Instructors.SelectInstructorByCredentials(content['email'], content['password_hash'])
    accessToken = create_access_token(identity=instructor)
    return jsonify({'token': accessToken})

@app.route('/instructors/update', methods=['POST'])
def InstructorUpdate():
    content = request.get_json(force=True)
    print content
    db.Instructors.UpdateInstructionById(content['id'], content['name'], content['surname'], content['email'], content['password_hash'])
    return jsonify({'message': 'Succcess'})

@app.route('/students', methods=['POST'])
def StudentRegister():
    content = request.get_json(force=True)
    db.Students.CreateStudent(content['name'], content['surname'], content['email'], content['password_hash'])
    return content, 200

@app.route('/students/login', methods=['POST'])
def StudentLogin():
    content = request.get_json(force=True)
    student = db.Students.SelectStudentByCredentials(content['email'], content['password_hash'])
    accessToken = create_access_token(identity=student)
    print student
    return jsonify({'token': accessToken})

@app.route('/students/update', methods=['POST'])
def StudentUpdate():
    content = request.get_json(force=True)
    print content
    db.Students.UpdateStudentById(content['id'], content['name'], content['surname'], content['email'], content['password_hash'])
    return jsonify({'message': 'Succcess'})

@app.route('/projects', methods=['POST'])
def ProjectCreate():
    content = request.get_json(force=True)
    print content
    db.Projects.CreateProject(content['title'], content['description'],  content['deadline'], content['max_price'], content['min_price'], content['s_id'], content['t_id'])
    return jsonify()

@app.route('/projects')
def ProjectGet():
    return db.Projects.SelectAllProjects(), 200

@app.route('/projects/active')
def ProjectGetActive():
    return db.Projects.SelectActiveProjects(), 200

@app.route('/projects/student/<int:s_id>/active')
def ProjectActiveGetByStudentId(s_id):
    return db.Projects.SelectActiveProjectsByStudentId(s_id)

@app.route('/projects/student/<int:s_id>/pasive')
def ProjectPasiveGetByStudentId(s_id):
    return db.Projects.SelectPasiveProjectsByStudentId(s_id)

@app.route('/projects/instructor/<int:i_id>/pasive')
def ProjectPasiveGetByInstructorId(i_id):
    return db.Projects.SelectProjectsByInstructorId(i_id)

@app.route('/projects/<int:s_id>')
def ProjectGetByStudentId(s_id):
    return db.Projects.SelectProjectByProjectId(s_id)

@app.route('/projects/update', methods=['POST'])
def ProjectUpdate():
    content = request.get_json(force=True)
    print content
    db.Projects.UpdateProjectById(content['id'], content['title'], content['description'], content['deadline'], content['min_price'], content['max_price'], content['t_id'])
    return jsonify({'message': 'Succcess'})

@app.route('/projects/delete/<int:id>')
def ProjectDelete(id):
    db.Projects.DeleteProjectById(id)
    return jsonify({'message': 'Succcess'})
    
@app.route('/proposals', methods=['POST'])
def ProposalCreate():
    content = request.get_json(force=True)
    print content
    print datetime.now().strftime("%Y-%m-%d")
    db.Proposals.CreateProposal(content['comment'], content['price'], datetime.now().strftime("%Y-%m-%d"), content['p_id'], content['i_id'])
    return jsonify()

@app.route('/proposals/<int:p_id>')
def ProposalGetByProjectId(p_id):
    return db.Proposals.SelectProposalsByProjectId(p_id)

@app.route('/proposals/instructor/<int:i_id>')
def ProposalActiveGetByInstructorId(i_id):
    return db.Proposals.SelectActiveProposalsByInstructorId(i_id)

@app.route('/proposals/update', methods=['POST'])
def ProposalUpdate():
    content = request.get_json(force=True)
    print content
    db.Proposals.UpdateProposalById(content['id'], content['comment'],  content['price'])
    return jsonify()

@app.route('/proposals/delete/<int:id>')
def ProposalDelete(id):
    db.Proposals.DeleteProposalById(id)
    return jsonify()

@app.route('/contracts', methods=['POST'])
def ContractCreate():
    content = request.get_json(force=True)
    print content
    db.Contracts.CreateContract(datetime.now().strftime("%Y-%m-%d"), content['project_id'], content['proposal_id'])
    return jsonify()

@app.route('/rates', methods=['POST'])
def RateCreate():
    content = request.get_json(force=True)
    print content
    db.Rates.CreateRate(content['c_id'], content['score'], content['comment'])
    return jsonify()

@app.route('/rates/update', methods=['POST'])
def RateUpdate():
    content = request.get_json(force=True)
    print content
    db.Rates.UpdateRate(content['c_id'], content['score'], content['comment'])
    return jsonify()

if __name__ == '__main__':
    app.run(port=7000, debug=True)
