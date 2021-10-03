const status = require("http-status");
const Employee = require("../models/employee");

function employeeController() {
  return {
    async createEmployee(req, res, next) {
      const { name, email, position, dept } = req.body;

      try {
        let employee = await Employee.findOne({ email });
        if (employee) {
          res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ errors: [{ msg: "Employee Already Exists" }] });
        }

        let newEmployee = new Employee({
          name,
          email,
          position,
          dept,
        });

        let newAppointment = await Employee.create(newEmployee);
        res.json({
          msg: "success",
          status: status.ACCEPTED,
          result: newAppointment,
        });
      } catch (err) {
        console.log(err.message);
        res.status(status.BAD_REQUEST).send("Server Error");
      }
    },

    async findallDetails(req, res, next) {
      try {
        let result = await Employee.find({});

        if (!result) {
          res.status(status.INTERNAL_SERVER_ERROR).send("Not Found Any Details");
        }
        res.status(status.ACCEPTED).send(result);
      } catch (err) {
        console.log(err.message);
        res.status(status.BAD_REQUEST).send("Server Error");
      }
    },

    async deleteOne(req, res, next) {
      try {
        let { id } = req.params.id;

        const emp = await Employee.findByIdAndRemove(id);
        if (!emp) {
          return res
            .status(status.NOT_FOUND)
            .json({ msg: "This empID not found" });
        }

        res.json({ msg: `This item is deleted with Id = ${result._id}` });
      } catch (err) {
        if (err.kind == "ObjectId") {
          return res.status(status.NOT_FOUND).json({ msg: "emp not found" });
        }

        res.status(status.BAD_REQUEST).send("Server Error");
      }
    },

    async findOne(req, res, next) {
      try {
        let { id } = req.params;

        const emp = await Employee.findById(id);
        if (!emp) {
          return res
            .status(status.NOT_FOUND)
            .json({ msg: "Employee not found" });
        }

        res.status(status.ACCEPTED).json(emp);
      } catch (err) {
        if (err.kind == "ObjectId") {
          return res
            .status(status.NOT_FOUND)
            .json({ msg: "Employee not found" });
        }

        res.status(status.BAD_REQUEST).send("Server Error");
      }
    },
  


  async updateEmployee(req, res, next) {
    const { name, email, position, dept } = req.body;

    try {
      let { id } = req.params;

      let updatedEmployee ={
        name:req.body.name,
        email:req.body.email,
        position:req.body.position,
        dept:req.body.dept
      };

      let updatedValue = await Employee.findByIdAndUpdate({_id:id }, updatedEmployee, {new :true});
      res.json({
        msg: "success",
        status: status.ACCEPTED,
        result: updatedValue
      });
    } catch (err) {
      console.log(err.message);
      res.status(status.BAD_REQUEST).send("Server Error");
    }
  }

}
}

module.exports = employeeController;
