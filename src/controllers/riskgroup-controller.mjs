// riskgroup-controller.mjs
import { selectUsersByRiskgroup, updateRiskgroupByUserId } from "../models/user-model.mjs";

// gets all the user in the riskgroup for hpc contact list
const getUsersByRiskgroup = async(req, res) => {
  const user_level = req.user.user_level;
  if (user_level === 'hcp' || user-level === 'admin') {
    const result = await selectUsersByRiskgroup()
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

//Update user's riskgroup
const putUsersRiskgroup = async (req, res) => {
  const user_id_token = req.user.userId;
  const risk_group_date = req.body.risk_group_date;
  if (user_id_token == req.params.id) {
    const result = await updateRiskgroupByUserId(req.params.id, risk_group_date);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

export {
  getUsersByRiskgroup,
  putUsersRiskgroup,
}
