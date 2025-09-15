import CustomTextInput from "@/components/common/CustomTextInput";
import { Box, Button, Divider, CircularProgress } from "@mui/material";
import CustomButton from "@/components/common/CustomButton";

const CaseForm = (props) => {
  const {
    handleSaveClick,
    handleInputChange,
    formData,
    loading,
    errors,
    handleResetClick,
    disabled,
    isEditing = false,
  } = props;

  return (
    <Box component="form" onSubmit={handleSaveClick}>
      <CustomTextInput
        fullWidth
        fieldId="title"
        fieldLabel="Case Title"
        fieldType="text"
        value={formData.title}
        onChange={handleInputChange("title")}
        errors={errors.title ? [errors.title] : []}
        helperText={errors.title}
        sx={{ mb: 3 }}
      />
      <CustomTextInput
        fullWidth
        fieldId="referenceNumber"
        fieldLabel="Reference Number"
        fieldType="text"
        value={formData.referenceNumber}
        onChange={handleInputChange("referenceNumber")}
        errors={errors.referenceNumber ? [errors.referenceNumber] : []}
        helperText={errors.referenceNumber}
        sx={{ mb: 3 }}
      />
      <CustomTextInput
        fullWidth
        fieldId="description"
        fieldLabel="Description"
        fieldType="text"
        value={formData.description}
        onChange={handleInputChange("description")}
        errors={errors.description ? [errors.description] : []}
        helperText={errors.description}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
        {handleResetClick && (
          <div style={{ width: "100px" }}>
            <CustomButton
              type="reset"
              variant="contained"
              disabled={loading}
              buttonText="Reset"
              onClickFunc={handleResetClick}
            />
          </div>
        )}
        <div style={{ width: "100px" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || disabled}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditing ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CaseForm;
