from flask import Flask, jsonify, request
from flask_cors import CORS
from DbContext import DbContext

app = Flask(__name__)
CORS(app)
db = DbContext()

@app.route('/')
def hello_world():
    return jsonify('sa'), 200

@app.route('/instructors', methods=['POST'])
def InstructorRegister():
    content = request.get_json(force=True)
    db.Instructors.CreateInstructor((content['name'], content['surname'], content['email'], content['password_hash']))
    return content, 200

@app.route('/instructors/login', methods=['POST'])
def InstructorLogin():
    content = request.get_json(force=True)
    instructor = db.Instructors.SelectInstructorByCredentials(content['email'], content['password_hash'])
    return instructor, 200

@app.route('/students', methods=['POST'])
def StudentRegister():
    content = request.get_json(force=True)
    db.Students.CreateStudent((content['name'], content['surname'], content['email'], content['password_hash']))
    return content, 200

@app.route('/projects')
def ProjectGet():
    return db.Projects.SelectAllProjects(), 200

@app.route('/projects/<int:s_id>')
def ProjectGetByStudentId(s_id):
    return db.Projects.SelectProjectsByStudentId(s_id), 200

@app.route('/proposals', methods=['POST'])
def ProposalCreate():
    content = request.get_json(force=True)
    db.Proposals.CreateProposal((content['name'], content['surname'], content['email'], content['password_hash']))
    return content, 200

@app.route('/projects/<int:p_id>')
def ProposalGetbyProjectId(p_id):
    return db.Proposals.SelectProposalsByProjectId(p_id)

@app.route('/contracts', methods=['POST'])
def ContractCreate():
    content = request.get_json(force=True)
    db.Proposals.CreateProposal((content['name'], content['surname'], content['email'], content['password_hash']))
    return content, 200


if __name__ == '__main__':
    app.run(port=7000, debug=True)
