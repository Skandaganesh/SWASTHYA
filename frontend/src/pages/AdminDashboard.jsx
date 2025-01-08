import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [newMealPlan, setNewMealPlan] = useState({
    userId: '',
    startDate: '',
    endDate: '',
    goalType: '',
    totalCalories: '',
  });
  const [updateMealPlan, setUpdateMealPlan] = useState({
    planId: '',
    goalType: '',
    totalCalories: '',
  });

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/meal-plans`);
      setMealPlans(response.data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  const addMealPlan = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/meal-plans`, newMealPlan);
      fetchMealPlans();
      setNewMealPlan({ userId: '', startDate: '', endDate: '', goalType: '', totalCalories: '' });
    } catch (error) {
      console.error('Error adding meal plan:', error);
    }
  };

  const deleteMealPlan = async (planId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/meal-plans/${planId}`);
      fetchMealPlans();
    } catch (error) {
      console.error('Error deleting meal plan:', error);
    }
  };

  const updateMealPlanHandler = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/meal-plans/${updateMealPlan.planId}`,
        {
          goalType: updateMealPlan.goalType,
          totalCalories: updateMealPlan.totalCalories,
        }
      );
      fetchMealPlans();
      setUpdateMealPlan({ planId: '', goalType: '', totalCalories: '' });
    } catch (error) {
      console.error('Error updating meal plan:', error);
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '20px' }}>
      <h1 style={{ color: '#fff', backgroundColor: '#ff0000', padding: '10px', textAlign: 'center' }}>
        Admin Dashboard
      </h1>

      <h2 style={{ color: '#ff0000' }}>Meal Plans</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
          backgroundColor: '#fff',
        }}
      >
        <thead style={{ backgroundColor: '#ff0000', color: '#fff' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Plan ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>User ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Goal Type</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Calories</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mealPlans.map((plan) => (
            <tr key={plan.plan_id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{plan.plan_id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{plan.user_id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {new Date(plan.start_date).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {new Date(plan.end_date).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{plan.goal_type}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{plan.total_calories}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => deleteMealPlan(plan.plan_id)}
                  style={{
                    backgroundColor: '#ff0000',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ color: '#ff0000' }}>Add New Meal Plan</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMealPlan();
        }}
        style={{ marginBottom: '20px' }}
      >
        <input
          type="number"
          placeholder="User ID"
          value={newMealPlan.userId}
          onChange={(e) => setNewMealPlan({ ...newMealPlan, userId: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newMealPlan.startDate}
          onChange={(e) => setNewMealPlan({ ...newMealPlan, startDate: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="date"
          placeholder="End Date"
          value={newMealPlan.endDate}
          onChange={(e) => setNewMealPlan({ ...newMealPlan, endDate: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Goal Type"
          value={newMealPlan.goalType}
          onChange={(e) => setNewMealPlan({ ...newMealPlan, goalType: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Total Calories"
          value={newMealPlan.totalCalories}
          onChange={(e) => setNewMealPlan({ ...newMealPlan, totalCalories: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#ff0000',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Add Meal Plan
        </button>
      </form>

      <h2 style={{ color: '#ff0000' }}>Update Meal Plan</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMealPlanHandler();
        }}
      >
        <input
          type="number"
          placeholder="Plan ID"
          value={updateMealPlan.planId}
          onChange={(e) => setUpdateMealPlan({ ...updateMealPlan, planId: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Goal Type"
          value={updateMealPlan.goalType}
          onChange={(e) => setUpdateMealPlan({ ...updateMealPlan, goalType: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Total Calories"
          value={updateMealPlan.totalCalories}
          onChange={(e) => setUpdateMealPlan({ ...updateMealPlan, totalCalories: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#ff0000',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Update Meal Plan
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
