import * as React from "react";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type values = {
  firstName: string;
  lastName: string;
  phoneno: string[];
  email: string;
  password: string;
  skills: {
    skill: string;
  }[];
  age: number;
};

function App() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneno: ["", ""],
      email: "",
      password: "",
      skills: [{ skill: "" }],
      age: 18,
      mode: "onChange" // onBlur, onTouched, all, onSubmit(default)
    },
    // defaultValues: async () => {
    //   const response = await fetch("");
    //   const data  = await response.json;
    //   console.log(data);

    // }
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });

  const onSubmit = (data: values) => {
    console.log("form submiited..", data);
  };

  return (
    <>
      <Typography variant="h3">Form</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-1/2 m-3 p-3"
      >
        {" "}
        {/* <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "50%" } }}
          noValidate
          autoComplete="off"
        > */}
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="First Name"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "first name is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "last name is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            {/* <p className="text-sm text-red-400 mb-3 mt-1 ">
              {errors.lastName?.message}
            </p> */}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
                required: {
                  value: true,
                  message: "email is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            {/* <p className="text-sm text-red-400 mb-3 mt-1 ">
              {errors.email?.message}
            </p> */}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Primary Phone No"
              {...register("phoneno.0", {
                required: {
                  value: true,
                  message: "primary phone no is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.phoneno}
              helperText={errors.phoneno?.[0]?.message}
            />
            {/* <p className="text-sm text-red-400 mb-3 mt-1 ">
              {errors.phoneno?.[0]?.message}
            </p> */}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Secondary Phone No"
              {...register("phoneno.1", {
                required: {
                  value: true,
                  message: "secondary phone no is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.phoneno}
              helperText={errors.phoneno?.[1]?.message}
            />
            {/* <p className="text-sm text-red-400 mb-3 mt-1 ">
              {errors.phoneno?.[1]?.message}
            </p> */}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {/* <p className="text-sm text-red-400 mb-3 mt-1 ">
              {errors.password?.message}
            </p> */}
          </Grid>
          <Grid xs={12} sm={6}>
            <Typography sx={{ mt: "2px", mb: "4px" }}>
              Add your skills
            </Typography>
            {fields.map((field, index) => (
              <>
                <div key={field.id} className="flex gap-2">
                  <TextField
                    id="outlined-basic"
                    label="Skill"
                    {...register(`skills.${index}.skill`, {
                      required: {
                        value: true,
                        message: "skill is required",
                      },
                    })}
                    variant="outlined"
                    className="w-full"
                  />
                  <button onClick={() => append({ skill: "" })}>
                    <AddIcon />
                  </button>
                  {index > 0 && (
                    <button onClick={() => remove(index)}>
                      <RemoveIcon />
                    </button>
                  )}
                </div>
                {errors.skills?.[index]?.skill?.message && (
                  <p className="text-sm text-red-400 mb-3 mt-1">
                    {errors.skills[index].skill.message}
                  </p>
                )}
              </>
            ))}
          </Grid>
          <Grid xs={12} sm={6} sx={{ mt: "28px" }}>
            <TextField
              id="outlined-basic"
              label="Age"
              {...register("age", {
                valueAsNumber: true,
                min: {
                  value: 18,
                  message: "Age must be at least 18", // Custom error message for min validation
                },
                max: {
                  value: 35,
                  message: "Age must be less than or equal to 35", // Custom error message for max validation
                },
                required: {
                  value: true,
                  message: "last name is required",
                },
              })}
              variant="outlined"
              className="w-full"
              error={!!errors.age}
              helperText={errors.age?.message}
            />
            {/* <p className="text-sm text-red-400 mb-3 mt-1 ">
              {errors.age?.message}
            </p> */}
          </Grid>
        </Grid>
        <Grid>
          <button 
          disabled={!isDirty || !isValid || isSubmitting}
          className="text-lg bg-black text-white rounded-lg px-4 py-2 mt-3">
            Submit
          </button>
          <button className="ml-4" onClick={() => reset()}>Reset</button>
        </Grid>
        {/* </Box> */}
      </form>
      <DevTool control={control} />
    </>
  );
}

export default App;
