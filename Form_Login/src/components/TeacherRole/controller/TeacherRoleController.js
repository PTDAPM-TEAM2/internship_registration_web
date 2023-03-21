import userApi from "../../../api/authApi"
import graduationThesis from "../../../api/graduationThesis";
import projectApi from "../../../api/projectApi";

class TeacherRoleController{

    getCurrentUser = async (token) => {
        try{
            const response = await userApi.getInfo(token)
            return response;
        }catch(err){
            console.log(err);
        }
    }

    getAllResearch = async (body, token) => {
        try{
            const response = await projectApi.getAllDa(body, token);
            return response;
        }catch(err){
            console.log(err);
        }
    }

    addWeeklyTeacherReview = async (body, token) => {
        try{
            await graduationThesis.weeklyTeacherSaving(body, token);
        }catch(err){
            console.log(err);
        }
    }

}

const teacherRoleController = new TeacherRoleController();
export default teacherRoleController;