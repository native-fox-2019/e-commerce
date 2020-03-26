<template>
  <div>
    <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="12">
          <b-card-body :title="this.PropProduct.email">
            <div>
              <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
              <div class="mt-3">
                Selected:
                <strong>{{ selected }}</strong>
              </div>
            </div>
            <b-button pill variant="danger" @click.prevent="deleteUser">Delete</b-button>
            <b-button pill variant="primary" @click.prevent="swalUpdateUser">Update</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["PropProduct"],
  data() {
    return {
      id: this.PropProduct.id,
      role: this.PropProduct.role,
      selected: this.PropProduct.role,
      options: [
        { value: "Admin", text: "Admin" },
        { value: "Customer", text: "Customer" }
      ]
    };
  },
  methods: {
    swalUpdateUser() {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
      }).then(result => {
        if (result.value) {
          this.updateRole();
          Swal.fire("Update!", "Your file has been updated.", "success");
        }
      });
    },
    updateRole() {
      axios({
        url: "https://murmuring-caverns-76029.herokuapp.com/user/" + this.id,
        method: "put",
        data: {
          role: this.selected
        }
      }).then(response => {
        this.$store.dispatch("updateUserRole", response.data);
      });
    },
    deleteUser() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.deleteActionUser();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    deleteActionUser() {
      axios({
        method: "delete",
        url: `https://murmuring-caverns-76029.herokuapp.com/user/${this.id}`,
        headers: {
          token: localStorage.getItem("tokenAdmin")
        }
      }).then(() => {
        this.$store.dispatch("deleteDataUser", this.id);
      });
    }
  }
};
</script>