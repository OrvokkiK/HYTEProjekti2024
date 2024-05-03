// riskgroup-controller.mjs
import { selectUsersByRiskgroup, updateRiskgroupByUserId } from "../models/user-model.mjs";

// gets all the user in the riskgroup for hpc contact list
const getUsersByRiskgroup = async(req, res) => {
  const result = await selectUsersByRiskgroup()
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

//Update user's riskgroup
const putUsersRiskgroup = async (req, res) => {
    const result = await updateRiskgroupByUserId(req.params.id);
    if (result.error) {
        return res.status(result.error).json(result);
    }
    return res.json(result);
};

export {
    getUsersByRiskgroup,
    putUsersRiskgroup,
}
