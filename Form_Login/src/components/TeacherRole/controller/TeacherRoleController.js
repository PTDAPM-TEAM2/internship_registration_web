import userApi from "../../../api/authApi"
import graduationThesis from "../../../api/graduationThesis";
import projectApi from "../../../api/projectApi";

class TeacherRoleController{

    getCurrentUser = async (token) => {
        await userApi.getInfo(token)
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

    forceToStopResearch = async (body, token) => {
        try{
            await graduationThesis.addOrRemoveGraduation(body, token);
        }catch(err){
            console.log(err);
        }
    }

    changePassword = async (body, token) => {
        await userApi.setChangingPassword(body, token);
    }

}

const teacherRoleController = new TeacherRoleController();
export default teacherRoleController;